// src/app/auth/register.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../services/authService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(email, password, firstName, lastName);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Error en el registro");
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                {/* <!-- Basic registration form--> */}
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header justify-content-center">
                    <h3 className="fw-light my-4">Create Account</h3>
                  </div>
                  <div className="card-body">
                    {/* <!-- Registration form--> */}
                    <form onSubmit={handleSubmit}>
                      {/* <!-- Form Row--> */}
                      <div className="row gx-3">
                        <div className="col-md-6">
                          {/* <!-- Form Group (first name)--> */}
                          <div className="mb-3">
                            <label
                              className="small mb-1"
                              htmlFor="inputFirstName">
                              Nombre
                            </label>
                            <input
                              className="form-control"
                              id="inputFirstName"
                              type="text"
                              placeholder="Ingresa tu nombre"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* <!-- Form Group (last name)--> */}
                          <div className="mb-3">
                            <label
                              className="small mb-1"
                              htmlFor="inputLastName">
                              Apellido
                            </label>
                            <input
                              className="form-control"
                              id="inputLastName"
                              type="text"
                              placeholder="Ingresa tu apellido"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <!-- Form Group (email address)            --> */}
                      <div className="mb-3">
                        <label
                          className="small mb-1"
                          htmlFor="inputEmailAddress">
                          Correo
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
                      {/* <!-- Form Row    --> */}
                      <div className="row gx-3">
                        <div className="col-md-6">
                          {/* <!-- Form Group (password)--> */}
                          <div className="mb-3">
                            <label
                              className="small mb-1"
                              htmlFor="inputPassword">
                              Contraseña
                            </label>
                            <input
                              className="form-control"
                              id="inputPassword"
                              type="password"
                              placeholder="Ingresar contraseña"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* <!-- Form Group (confirm password)--> */}
                          <div className="mb-3">
                            <label
                              className="small mb-1"
                              htmlFor="inputConfirmPassword">
                              Confirmar contraseña
                            </label>
                            <input
                              className="form-control"
                              id="inputConfirmPassword"
                              type="password"
                              placeholder="Confirmar contraseña"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* <!-- Form Group (create account submit)--> */}
                      <button
                        className="btn btn-primary btn-block"
                        type="submit">
                        Crear Cuenta
                      </button>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <a href="/">¿Tienes una cuenta? Ir a inicio de sesión</a>
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

export default Register;
