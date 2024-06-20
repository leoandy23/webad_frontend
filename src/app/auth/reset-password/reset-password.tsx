"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/authService";

const ResetPasswordContent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      alert("Invalid or missing token");
      router.push("/auth/login");
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Missing token");
      return;
    }

    try {
      await resetPassword(token, password);
      alert("Password has been reset successfully");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Error al restablecer la contraseña");
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header justify-content-center">
                    <h3 className="fw-light my-4">Restablecer Contraseña</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="small mb-1" htmlFor="newPassword">
                          Nueva Contraseña
                        </label>
                        <input
                          className="form-control"
                          id="newPassword"
                          type="password"
                          placeholder="Ingrese la nueva contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="small mb-1" htmlFor="confirmPassword">
                          Confirmar Nueva Contraseña
                        </label>
                        <input
                          className="form-control"
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme la nueva contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="/login">
                          Regresar al inicio de sesión
                        </a>
                        <button className="btn btn-primary" type="submit">
                          Restablecer Contraseña
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <a href="/auth/register">
                        ¿Necesitas una cuenta? Regístrate!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
