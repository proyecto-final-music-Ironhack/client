import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <p>¿Cómo has llegado aquí?</p>
      <Link to="/">Volver a Home</Link>
    </div>
  );
}
