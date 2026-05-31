from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from app.supabase_client import supabase

DOCUMENT_EXTENSIONS = {".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

BUCKET_NAME = "uploads"


def _safe_suffix(filename: str | None) -> str:
    return Path(filename or "").suffix.lower()


def save_upload_file(
    file: UploadFile,
    *,
    subdir: str,
    allowed_extensions: set[str],
) -> str:
    suffix = _safe_suffix(file.filename)

    if suffix not in allowed_extensions:
        allowed = ", ".join(sorted(allowed_extensions))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Tipe file tidak didukung. Gunakan: {allowed}",
        )

    filename = f"{subdir}/{uuid4().hex}{suffix}"

    content = file.file.read()

    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Ukuran file terlalu besar",
        )

    try:
        supabase.storage.from_(BUCKET_NAME).upload(
            filename,
            content,
            {
                "content-type": file.content_type,
            },
        )

        return supabase.storage.from_(BUCKET_NAME).get_public_url(
            filename
        )

    finally:
        file.file.close()
