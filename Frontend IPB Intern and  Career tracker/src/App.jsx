import './App.css'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircleAlert } from 'lucide-react';
import Button from './components/ui/Button';
import GlobalLoader from './components/ui/GlobalLoader';
import PopUpNotif from './components/ui/PopUpNotif';
import { API_LOADING_EVENT } from './services/api';
import { APP_ALERT_EVENT } from './services/alertService';

// auth
import LandingPage from './pages/auth/LandingPage';
import SelectRole from './pages/auth/SelectRole';
import LoginMhs from './pages/auth/LoginMhs';
import LoginMitra from './pages/auth/LoginMitra';
import SignUpMhs from './pages/auth/SignUpMhs';
import SignUpMitra from './pages/auth/SignUpMitra';
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage';
import NewPasswordPage from './pages/auth/NewPasswordPage';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

//mahasiswa
import DashboardLayoutMhs from './components/layout/mahasiswa/DashboardLayoutMhs';
import DashboardMhs from './pages/mahasiswa/DashboardMhs';
import FormPendaftaran from './pages/mahasiswa/FormPendaftaran';
import LamaranList from './pages/mahasiswa/LamaranList';
import LamaranDetail from './pages/mahasiswa/LamaranDetail';
import LogbookDetail from './pages/mahasiswa/LogbookDetail';
import LogbookList from './pages/mahasiswa/LogbookList';
import MagangListMhs from './pages/mahasiswa/MagangListMhs';
import MagangDetailMhs from './pages/mahasiswa/MagangDetailMhs';
import KompetisiListMhs from './pages/mahasiswa/KompetisiListMhs';
import StupenListMhs from './pages/mahasiswa/StupenListMhs';
import PendaftaranBerhasil from './pages/mahasiswa/PendaftaranBerhasil';
import KompetisiDetail from './pages/mahasiswa/KompetisiDetail';
import StupenDetail from './pages/mahasiswa/StupenDetail';
import MagangFiltered from './pages/mahasiswa/MagangFiltered';
import ProfileMahasiswa from './pages/mahasiswa/ProfileMahasiswa';

// mitra
import DashboardLayoutMitra from './components/layout/mitra/DashboardLayoutMitra';
import DashboardMitra from './pages/mitra/DashboardMitra';
import PelamarList from './pages/mitra/PelamarList';
import PelamarDetail from './pages/mitra/PelamarDetail';
import ProgramListMitra from './pages/mitra/ProgramListMitra';
import MagangDetailMitra from './pages/mitra/MagangDetailMitra';
import CreateMagang from './pages/mitra/CreateMagang';
import CreateKompetisi from './pages/mitra/CreateKompetisi';
import CreateStupen from './pages/mitra/CreateStupen';
import DocRequirement from './pages/mitra/DocRequirement';
import EditMagang from './pages/mitra/EditMagang';
import EditKompetisi from './pages/mitra/EditKompetisi';
import EditStupen from './pages/mitra/EditStupen';
import DraftList from './pages/mitra/DraftList';
import KompetisiDetailMitra from './pages/mitra/KompetisiDetailMitra';
import StupenDetailMitra from './pages/mitra/StupenDetailMitra';
import ProfileMitra from './pages/mitra/ProfileMitra';

function App() {
  const [appAlert, setAppAlert] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  useEffect(() => {
    const handleAlert = (event) => {
      setAppAlert(event.detail);
    };

    window.addEventListener(APP_ALERT_EVENT, handleAlert);
    return () =>
      window.removeEventListener(APP_ALERT_EVENT, handleAlert);
  }, []);

  useEffect(() => {
    const handleApiLoading = (event) => {
      setIsApiLoading(Boolean(event.detail?.isLoading));
    };

    window.addEventListener(API_LOADING_EVENT, handleApiLoading);
    return () =>
      window.removeEventListener(API_LOADING_EVENT, handleApiLoading);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />}/>

        {/* Auth */}
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/login-mahasiswa" element={<LoginMhs />}/>
        <Route path="/login-mitra" element={<LoginMitra />}/>
        <Route path="/sign-up-mahasiswa" element={<SignUpMhs />} />
        <Route path="/sign-up-mitra" element={<SignUpMitra />}/>
        <Route path="/forget-password" element={<ForgetPasswordPage />}/>
        <Route path="/new-password" element={<NewPasswordPage />}/>
        <Route path="/reset-password" element={<NewPasswordPage />}/>
        <Route path="/unauthorized" element={<UnauthorizedPage />}/>

        {/* Mahasiswa */}
        <Route
          element={
            <ProtectedRoute allowedRole="mahasiswa">
              <DashboardLayoutMhs />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard-mahasiswa" element={<DashboardMhs />} />
          <Route path="/formpendaftaran" element={<FormPendaftaran />} />
          <Route path="/formpendaftaran/:id" element={<FormPendaftaran />} />
          <Route path="/lamaran-list" element={<LamaranList />} />
          <Route path="/lamaran-detail/:id" element={<LamaranDetail />} />
          <Route path="/logbook-detail/:id" element={<LogbookDetail />} />
          <Route path="/logbook-list" element={<LogbookList />} />
          <Route path="/magang-list" element={<MagangListMhs />} />
          <Route path="/magang-detail/:id" element={<MagangDetailMhs />} />
          <Route path="/kompetisi-list" element={<KompetisiListMhs />} />
          <Route path="/stupen-list" element={<StupenListMhs />} />
          <Route path="/pendaftaran-berhasil" element={<PendaftaranBerhasil />} />
          <Route path="/kompetisi-detail/:id" element={<KompetisiDetail />} />
          <Route path="/studi-independen-detail/:id" element={<StupenDetail />} />
          <Route path="/magang-filtered/:category" element={<MagangFiltered />} />
          <Route path="/profile-mahasiswa" element={<ProfileMahasiswa />} />
        </Route>

        {/* Mitra */}
        <Route
          element={
            <ProtectedRoute allowedRole="mitra">
              <DashboardLayoutMitra />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard-mitra" element={<DashboardMitra />} />
          <Route path="/pelamar-list/:id" element={<PelamarList />} />
          <Route path="/pelamar-detail/:id" element={<PelamarDetail />} />
          <Route path="/logbook-detail-mitra/:id" element={<LogbookDetail readOnly />} />
          <Route path="/program-list-mitra" element={<ProgramListMitra />} />
          <Route path="/magang-detail-mitra/:id" element={<MagangDetailMitra />} />
          <Route path="/create-magang" element={<CreateMagang />} />
          <Route path="/create-kompetisi" element={<CreateKompetisi />} />
          <Route path="/create-studi-independen" element={<CreateStupen />} />
          <Route path="/doc-requirement" element={<DocRequirement />} />
          <Route path="/edit-magang/:id" element={<EditMagang />} />
          <Route path="/edit-kompetisi/:id" element={<EditKompetisi />} /> 
          <Route path="/edit-studi-independen/:id" element={<EditStupen />} />
          <Route path="/draft-list" element={<DraftList />} />
          <Route path="/kompetisi-detail-mitra/:id" element={<KompetisiDetailMitra  />} />
          <Route path="/stupen-detail-mitra/:id" element={<StupenDetailMitra  />} />
          <Route path="/profile-mitra" element={<ProfileMitra/>} />
        </Route>

      </Routes>

      <PopUpNotif
        isOpen={Boolean(appAlert)}
        onClose={() =>
          setAppAlert(null)
        }
        icon={
          <CircleAlert
            size={90}
            className="text-yellow-500"
          />
        }
        title={appAlert?.title}
        description={appAlert?.description}
      >
        <Button
          label="Tutup"
          onClick={() =>
            setAppAlert(null)
          }
        />
      </PopUpNotif>

      <GlobalLoader isOpen={isApiLoading} />
    </div>
  );
}

export default App;
