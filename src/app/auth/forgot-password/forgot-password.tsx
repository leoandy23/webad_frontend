// src/app/auth/forgot-password.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetPasswordEmail } from "@/services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetPasswordEmail(email);
      alert(
        "Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico"
      );
    } catch (error) {
      console.error(error);
      alert("Error al enviar el correo de restablecimiento de contraseña");
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                {/* <!-- Basic forgot password form--> */}
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header justify-content-center">
                    <h3 className="fw-light my-4">
                      Recuperación de Contraseña
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="small mb-3 text-muted">
                      Ingresa tu dirección de correo electrónico y te enviaremos
                      un enlace para restablecer tu contraseña.
                    </div>
                    {/* <!-- Forgot password form--> */}
                    <form onSubmit={handleSubmit}>
                      {/* <!-- Form Group (email address)--> */}
                      <div className="mb-3">
                        <label
                          className="small mb-1"
                          htmlFor="inputEmailAddress">
                          Correo Electrónico
                        </label>
                        <input
                          className="form-control"
                          id="inputEmailAddress"
                          type="email"
                          aria-describedby="emailHelp"
                          placeholder="Ingresa tu correo electrónico"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {/* <!-- Form Group (submit options)--> */}
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="/">
                          Volver al inicio de sesión
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
                        ¿Necesitas una cuenta? Regístrate
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

export default ForgotPassword;
