import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    BriefcaseBusiness,
    ChevronDown,
    CircleCheck,
    CircleX,
    CircleUser,
} from "lucide-react";
import { authService } from "../../../services/authService";
import { mitraService } from "../../../services/mitraService";
import { notifikasiService } from "../../../services/notifikasiService";
import {
    mapMitraProfileToUi,
    mapNotification,
} from "../../../services/adapters";
import { showAlert } from "../../../services/alertService";

const TopbarMitra = () => {

    const [showDropdown, setShowDropdown] =
        useState(false);
    const [showNotification, setShowNotification] =
        useState(false);

    const navigate = useNavigate();
    const [profileName, setProfileName] =
        useState("");
    const [profileImage, setProfileImage] =
        useState(null);
    const [notifications, setNotifications] =
        useState([]);
    const [unreadCount, setUnreadCount] =
        useState(0);

    useEffect(() => {
        const loadTopbarData = async () => {
            try {
                const [
                    profile,
                    notificationData,
                    countData,
                ] = await Promise.all([
                    mitraService.getMe(),
                    notifikasiService.list(),
                    notifikasiService.countUnread(),
                ]);
                const mappedProfile =
                    mapMitraProfileToUi(profile);

                setProfileName(mappedProfile.namaInstansi);
                if (mappedProfile.fotoProfile) {
                    setProfileImage(mappedProfile.fotoProfile);
                }

                setNotifications(
                    notificationData.map(mapNotification)
                );
                setUnreadCount(countData.jumlah || 0);
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadTopbarData();

        const handleProfileUpdate = async () => {
            try {
                const profile =
                    await mitraService.getMe();

                const mappedProfile =
                    mapMitraProfileToUi(profile);

                setProfileName(
                    mappedProfile.namaInstansi
                );

                setProfileImage(
                    mappedProfile.fotoProfile || null
                );

            } catch {
                //
            }
        };

        window.addEventListener(
            "mitraProfileUpdated",
            handleProfileUpdate
        );

        return () =>
            window.removeEventListener(
                "mitraProfileUpdated",
                handleProfileUpdate
        );
    }, []);

    const hasUnreadNotification = unreadCount > 0;

    return (
        <header className="
            bg-white
            border-b
            border-gray-200
            px-6
            py-4

            flex
            justify-end
            items-center
        ">

            {/* RIGHT SECTION */}
            <div className="
                flex
                items-center
                gap-4
            ">

                {/* NOTIFICATION */}
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowNotification(
                                !showNotification
                            )
                        }
                        className="
                            text-indigo-800
                            hover:text-indigo-600
                            transition
                            cursor-pointer
                        "
                    >
                        <div className="relative">
                            <Bell size={20}/>

                            {hasUnreadNotification && (
                                <span className="
                                    absolute
                                    -top-1
                                    -right-1
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-light-blue
                                    border-2
                                    border-white
                                "></span>
                            )}
                        </div>
                    </button>

                    {showNotification && (
                        <div className="
                            fixed
                            top-16
                            left-4
                            right-4
                            z-50
                            w-auto
                            max-w-none
                            md:absolute
                            md:top-12
                            md:left-auto
                            md:right-0
                            md:w-[360px]
                            md:max-w-[calc(100vw-2rem)]
                            bg-white
                            rounded-2xl
                            shadow-2xl
                            border
                            border-light-blue
                            overflow-hidden
                            animate-fadeInUp
                        ">
                            <div className="
                                px-5
                                py-4
                                border-b
                                border-gray-100
                                bg-light-blue-2
                            ">
                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-bold-blue
                                ">
                                    Notifikasi
                                </h2>

                                <p className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    Update terbaru lamaran masuk
                                </p>
                            </div>

                            <div className="
                                max-h-[calc(100vh-11rem)]
                                md:max-h-[350px]
                                overflow-y-auto
                            ">
                                {notifications.length === 0 && (
                                    <div className="
                                        px-5
                                        py-6
                                        text-sm
                                        text-gray-500
                                    ">
                                        Belum ada notifikasi.
                                    </div>
                                )}

                                {notifications.map((notif) => {
                                    let icon = (
                                        <BriefcaseBusiness
                                            size={18}
                                        />
                                    );
                                    let iconStyle =
                                        "bg-yellow-100 text-yellow-600";

                                    if (
                                        notif.status === "Diterima"
                                    ) {
                                        icon = (
                                            <CircleCheck size={18} />
                                        );
                                        iconStyle =
                                            "bg-green-100 text-green-600";
                                    }

                                    if (
                                        notif.status === "Ditolak"
                                    ) {
                                        icon = (
                                            <CircleX size={18} />
                                        );
                                        iconStyle =
                                            "bg-red-100 text-red-500";
                                    }

                                    return (
                                        <div
                                            key={notif.id}
                                            onClick={async () => {
                                                try {
                                                    await notifikasiService.markRead(
                                                        notif.id
                                                    );
                                                } catch (error) {
                                                    showAlert(error.message);
                                                }

                                                setNotifications(
                                                    notifications.map(
                                                        (item) =>
                                                            item.id ===
                                                            notif.id
                                                                ? {
                                                                    ...item,
                                                                    isRead: true,
                                                                }
                                                                : item
                                                    )
                                                );
                                                setUnreadCount((count) =>
                                                    Math.max(
                                                        count - 1,
                                                        0
                                                    )
                                                );
                                                setShowNotification(
                                                    false
                                                );
                                                navigate(
                                                    "/program-list-mitra"
                                                );
                                            }}
                                            className={`
                                                flex
                                                gap-4
                                                px-5
                                                py-4
                                                border-b
                                                border-gray-100
                                                transition
                                                cursor-pointer
                                                hover:bg-light-blue-2
                                                ${
                                                    !notif.isRead
                                                        ? "bg-light-blue-2"
                                                        : "bg-white"
                                                }
                                            `}
                                        >
                                            <div className={`
                                                w-10
                                                h-10
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                ${iconStyle}
                                            `}>
                                                {icon}
                                            </div>

                                            <div className="flex-1">
                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                ">
                                                    <h3 className={`
                                                        text-sm
                                                        text-black
                                                        ${
                                                            !notif.isRead
                                                                ? "font-bold"
                                                                : "font-semibold"
                                                        }
                                                    `}>
                                                        {notif.title}
                                                    </h3>

                                                    {!notif.isRead && (
                                                        <span className="
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            bg-light-blue
                                                        "></span>
                                                    )}
                                                </div>

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                    mt-1
                                                    leading-relaxed
                                                ">
                                                    {notif.message}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE WRAPPER */}
                <div className="relative">
                    {/* PROFILE */}
                    <div
                        onClick={() =>
                            setShowDropdown(
                                !showDropdown
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            cursor-pointer
                        "
                    >
                        {/* AVATAR */}
                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt="Logo Mitra"
                                className="
                                    w-8
                                    h-8
                                    rounded-full
                                    object-cover
                                "
                            />

                        ) : (

                            <div
                                className="
                                    w-8
                                    h-8
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <CircleUser
                                    size={24}
                                    className="text-bold-blue"
                                />
                            </div>

                        )}
                        
                        {/* NAME */}
                        <span className="
                            hidden
                            md:inline
                            text-sm
                            font-regular
                            text-gray-800
                        ">
                            {profileName}
                        </span>

                        {/* DROPDOWN ICON */}
                        <ChevronDown
                            size={18}
                            className={`
                                hidden
                                md:block
                                text-gray-600
                                transition-transform
                                duration-300
                                ${
                                    showDropdown
                                    ? "rotate-180"
                                    : ""
                                }
                            `}
                        />

                    </div>

                    {/* DROPDOWN MENU */}
                    {showDropdown && (
                        <div className="
                            absolute
                            top-12
                            right-0
                            z-20
                            w-48
                            bg-white
                            border
                            border-light-blue
                            rounded-xl
                            shadow-lg
                            overflow-hidden
                        ">

                            {/* EDIT PROFILE */}
                            <button
                                onClick={() =>
                                    navigate(
                                        "/profile-mitra"
                                    )
                                }
                                className="
                                    block
                                    w-full
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    text-gray-700
                                    hover:bg-light-blue-2
                                    transition
                                    cursor-pointer
                                "
                            >
                                Edit Profile
                            </button>

                            {/* LOGOUT */}
                            <button
                                onClick={() => {
                                    authService.logout();
                                    navigate("/");
                                }}
                                className="
                                    block
                                    w-full
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    text-red-600
                                    hover:bg-red-50
                                    transition
                                    cursor-pointer
                                "
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopbarMitra;
