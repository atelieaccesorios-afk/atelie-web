import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTools, FaLeaf, FaShieldAlt, FaTruck, FaStar, FaAward, FaEnvelope, FaComments, FaPlus } from "react-icons/fa";
import { GiCutDiamond, GiEmerald, GiHammerBreak } from "react-icons/gi";

const WHATSAPP_NUMERO = "573162559987";

/** Tallas USA 3–13 enteras y medias; ø mm aprox. (enteras estándar, medias interpoladas). */
const DIAMETRO_TALLA_ENTERA = {
  3: 14.0, 4: 14.8, 5: 15.7, 6: 16.5, 7: 17.3, 8: 18.1, 9: 19.0, 10: 19.8, 11: 20.6, 12: 21.4, 13: 22.2,
};

function mmStr(n) {
  return n.toFixed(1).replace(".", ",");
}

const TALLAS_ANILLO = (() => {
  const list = [];
  for (let s = 3; s <= 12; s++) {
    list.push({ valor: String(s), etiqueta: `${s} — ø ${mmStr(DIAMETRO_TALLA_ENTERA[s])} mm` });
    const medio = (DIAMETRO_TALLA_ENTERA[s] + DIAMETRO_TALLA_ENTERA[s + 1]) / 2;
    list.push({ valor: `${s}.5`, etiqueta: `${s} ½ — ø ${mmStr(medio)} mm` });
  }
  list.push({ valor: "13", etiqueta: `13 — ø ${mmStr(DIAMETRO_TALLA_ENTERA[13])} mm` });
  return list;
})();

const compromiso = Array.from({ length: 54 }, (_, i) => {
  const refNum = 301 + i;
  return {
    id: i + 1,
    name: `Ref ${refNum}`,
    img: process.env.PUBLIC_URL + `/catalogo/${refNum}.webp`,
  };
});

const matrimonio = Array.from({ length: 75 }, (_, i) => {
  const refNum = 201 + i;
  return {
    id: 100 + i,
    name: `Ref ${refNum}`,
    img: process.env.PUBLIC_URL + `/catalogo/${refNum}.webp`,
  };
});

const BENEFICIOS_NOSOTROS = [
  { Icon: FaTools, titulo: "MANTENIMIENTO DE POR VIDA", texto: "Mantenimiento de por vida para anillos de matrimonio." },
  { Icon: GiCutDiamond, titulo: "DIAMANTES CERTIFICADOS", texto: "Certificamos diamantes después de 0,5 quilates." },
  { Icon: GiEmerald, titulo: "ESMERALDAS CERTIFICADAS", texto: "Esmeraldas de alta calidad, certificamos después de 0,5 quilates." },
  { Icon: FaLeaf, titulo: "ORO SOSTENIBLE", texto: "Oro de origen sostenible, con trazabilidad completa." },
  { Icon: FaAward, titulo: "PREMIOS Y RECONOCIMIENTOS", texto: "Reconocidos por nuestra excelencia en matrimonio.com.co" },
];

const TESTIMONIOS = [
  { nombre: "Carolina Gómez", texto: "La atención de Atelié es impecable. Diseñamos el anillo de compromiso desde cero y el resultado superó todas nuestras expectativas. ¡Mil gracias!", estrellas: 5 },
  { nombre: "Juan Pablo Restrepo", texto: "Buscábamos algo único para nuestras argollas de matrimonio y aquí encontramos la asesoría perfecta. Calidad y elegancia en cada detalle.", estrellas: 5 },
  { nombre: "Valentina Meza", texto: "Excelente servicio y cumplimiento. Mi anillo quedó hermoso, se nota la pasión con la que trabajan las joyas hechas a mano.", estrellas: 5 },
];

export default function AtelieWebsite() {
  const [view, setView] = useState("home");
  const [nombre, setNombre] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quotedImage, setQuotedImage] = useState(null);
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [talla, setTalla] = useState("");
  const [talla2, setTalla2] = useState("");
  const [metal, setMetal] = useState("");
  const [colorMetal, setColorMetal] = useState("");
  const [piedra, setPiedra] = useState("");
  const [referencia, setReferencia] = useState("");
  const [tipoProducto, setTipoProducto] = useState("compromiso");
  const [citaFecha, setCitaFecha] = useState("");
  const [citaHora, setCitaHora] = useState("");
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mejora SEO: Cambiar el título de la página dinámicamente
  useEffect(() => {
    const titulos = {
      home: "Atelié Joyería | Anillos de Compromiso y Argollas de Matrimonio Oro 18K",
      nosotros: "Sobre Atelié Joyería | Tradición y Calidad en Joyas Hechas a Mano",
      compromiso: "Anillos de Compromiso en Oro 18K | Catálogo Exclusivo Atelié",
      matrimonio: "Argollas de Matrimonio en Oro 18K | Símbolos de Amor Eterno",
      servicios: "Servicios de Joyería | Reparación y Mantenimiento Atelié",
      personalizar: "Cotiza tu Diseño Personalizado | Anillos a Medida Atelié",
      agendar: "Agendar Cita de Diseño | Atención Personalizada Atelié"
    };
    document.title = titulos[view] || "Atelié Joyería";

    // Manejo de la etiqueta robots para permitir indexación
    let robots = document.querySelector("meta[name='robots']");
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "index,follow";

    // Manejo de la etiqueta canonical para SEO
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    const paths = {
      home: "",
      nosotros: "nosotros",
      compromiso: "anillos-compromiso",
      matrimonio: "argollas-matrimonio",
      servicios: "servicios",
      agendar: "agendar",
      personalizar: "personalizar"
    };
    link.href = `https://www.atelie.com.co/${paths[view] || ""}`;

    // Notificar a Google Analytics sobre el cambio de "página" (vista interna)
    if (window.gtag) {
      window.gtag('config', 'G-8SV0LXTJ22', {
        page_title: document.title,
        page_path: `/${view === 'home' ? '' : view}`,
      });
    }
  }, [view]);

  const botonPrincipal = {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #d4af37, #b8962e)",
    border: "none",
    color: "#000",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
    borderRadius: "30px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  };

  const botonWhatsapp = {
    ...botonPrincipal,
    background: "#25D366",
    color: "#fff"
  };

  const botonBordeDorado = {
    ...botonPrincipal,
    background: "transparent",
    border: "2px solid #d4af37",
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    color: "#333",
    marginBottom: "6px"
  };

  const cotizarSectionTitle = {
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "2px",
    color: "#888",
    margin: "0 0 16px 0",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee"
  };

  const fieldGroup = { display: "flex", flexDirection: "column", gap: "4px" };

  // Estilos para el modal de imagen
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalContentStyle = {
    position: "relative",
    background: "transparent",
    padding: "0",
    maxWidth: "95%",
    maxHeight: "95%",
  };

  const enviarWhatsApp = () => {
    const mensaje = `Hola ATELIÊ\nSolicitud de Servicio:\nNombre: ${nombre}\nTeléfono: ${telefono}\nTipo de Servicio: ${servicio}\nDetalles: ${descripcion}`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const enviarCitaWhatsApp = () => {
    const mensaje = `Hola ATELIÊ\nQuiero agendar una cita para diseño personalizado:\nFecha: ${citaFecha}\nHora: ${citaHora}\n\nNombre: ${nombre}\nWhatsApp: ${telefono}`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const enviarCotizacion = () => {
    const tallaEtiqueta = TALLAS_ANILLO.find((t) => t.valor === talla)?.etiqueta ?? talla;
    const tallaEtiqueta2 = TALLAS_ANILLO.find((t) => t.valor === talla2)?.etiqueta ?? talla2;

    let mensaje = `Hola ATELIÊ\nQuiero cotizar:\nReferencia: ${referencia}\n`;
    if (tipoProducto === "matrimonio") {
      mensaje += `Talla 1: ${tallaEtiqueta}\nTalla 2: ${tallaEtiqueta2}\n`;
    } else {
      mensaje += `Talla: ${tallaEtiqueta}\n`;
    }
    mensaje += `Metal: ${metal}\nColor del metal: ${colorMetal}\nPiedra: ${piedra}\n\nNombre: ${nombre}\nTeléfono: ${telefono}`;

    if (quotedImage) {
      mensaje += `\n\nImagen de referencia: ${window.location.origin}${quotedImage}`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const footerLinkStyle = {
    color: "#ccc",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  };

  const handleMouseEnter = (e) => { e.currentTarget.style.color = "#d4af37"; };
  const handleMouseLeave = (e) => { e.currentTarget.style.color = "#ccc"; };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#fff", color: "#111", position: "relative" }}>

      {/* BOTÓN FLOTANTE MULTI-OPCIÓN (WhatsApp + Email) */}
      <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
        {showContactMenu && (
          <>
            {/* Opción Correo Electrónico */}
            <a href="mailto:contacto@atelie.com.co" 
              title="Enviar Correo"
              style={{ 
                backgroundColor: "#EA4335", color: "white", width: "50px", height: "50px", borderRadius: "50px", 
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)", transition: "all 0.3s ease" 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
              <FaEnvelope />
            </a>
            
            {/* Opción WhatsApp */}
            <a href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noreferrer"
              title="WhatsApp"
              style={{ 
                backgroundColor: "#25d366", color: "white", width: "50px", height: "50px", borderRadius: "50px", 
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)", transition: "all 0.3s ease" 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
              <FaWhatsapp />
            </a>
          </>
        )}
        
        {/* Botón Principal (Disparador) */}
        <button 
          onClick={() => setShowContactMenu(!showContactMenu)}
          style={{ 
            backgroundColor: "#d4af37", color: "black", width: "60px", height: "60px", borderRadius: "50px", 
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)", border: "none", cursor: "pointer", transition: "transform 0.3s ease" 
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
          {showContactMenu ? <FaPlus style={{ transform: "rotate(45deg)" }} /> : <FaComments />}
        </button>
      </div>

      <header style={{ borderBottom: "1px solid #f9f9f9", padding: isMobile ? "8px 15px" : "10px 5%", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", background: "#fff", position: "sticky", top: 0, zIndex: 1000, gap: isMobile ? "8px" : "0" }}>
        <img src={process.env.PUBLIC_URL + "/atelie_Logo.png"} alt="Logotipo Atelié Joyería - Anillos de compromiso y argollas de matrimonio" style={{ height: isMobile ? "75px" : "120px", width: "auto", cursor: "pointer" }} onClick={() => { setView("home"); window.scrollTo(0, 0); }} />
        <nav style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "12px" : "35px", cursor: "pointer", fontWeight: "600", fontSize: isMobile ? "10px" : "14px", letterSpacing: "1px", alignItems: "center", justifyContent: isMobile ? "center" : "flex-end" }}>
          <a href="/" onClick={(e) => { e.preventDefault(); setView("home"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>INICIO</a>
          <a href="/nosotros" onClick={(e) => { e.preventDefault(); setView("nosotros"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>NOSOTROS</a>
          <a href="/anillos-compromiso" onClick={(e) => { e.preventDefault(); setView("compromiso"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>{isMobile ? "COMPROMISO" : "ANILLOS DE COMPROMISO"}</a>
          <a href="/argollas-matrimonio" onClick={(e) => { e.preventDefault(); setView("matrimonio"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>{isMobile ? "MATRIMONIO" : "ARGOLLAS DE MATRIMONIO"}</a>
          <a href="/servicios" onClick={(e) => { e.preventDefault(); setView("servicios"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>SERVICIOS</a>
          <a href="/agendar" onClick={(e) => { e.preventDefault(); setView("agendar"); window.scrollTo(0, 0); }} style={{ textDecoration: "none", color: "inherit" }}>CITAS</a>
          <button style={{ ...botonPrincipal, padding: isMobile ? "6px 15px" : "10px 24px", fontSize: isMobile ? "11px" : "13px" }} onClick={() => { setView("personalizar"); setTipoProducto("compromiso"); setReferencia("Diseño Cliente"); setQuotedImage(null); window.scrollTo(0, 0); }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>COTIZAR</button>
        </nav>
      </header>

      {view === "home" && (
        <main>
          {/* HERO SECTION */}
          <section style={{ height: isMobile ? "60vh" : "80vh", position: "relative", overflow: "hidden" }}>
            <img src={process.env.PUBLIC_URL + "/hero-inicio.webp"} alt="Pareja con anillo de compromiso Atelié Joyería oro 18k" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: isMobile ? "center" : "left center" }} />
            <div style={{ position: "absolute", inset: 0, background: isMobile ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", justifyContent: "center", color: "white", padding: isMobile ? "0 20px" : "0 6%" }}>
              <div style={{ textAlign: isMobile ? "center" : "left", maxWidth: "480px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#d4af37", letterSpacing: "2px", marginBottom: "10px", display: "block" }}>— ANILLOS QUE MARCAN TU HISTORIA</span>
                <h1 style={{ fontWeight: "300", fontSize: "clamp(22px, 3.8vw, 38px)", marginBottom: "12px", letterSpacing: "2px", lineHeight: "1.2", fontFamily: "'Times New Roman', Times, serif" }}>Anillos de compromiso<br />y argollas de matrimonio en <span style={{ color: "#d4af37" }}>oro 18K</span></h1>
                <p style={{ fontSize: "clamp(12px, 1.3vw, 15px)", marginBottom: "30px", fontWeight: "300", opacity: 0.85, lineHeight: "1.6" }}>Diseñamos piezas únicas en Medellín que representan<br />momentos inolvidables con elegancia, calidad y significado.</p>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                  <button style={botonPrincipal} onClick={() => { document.getElementById('colecciones')?.scrollIntoView({ behavior: 'smooth' }); }}>Explora nuestra colección</button>
                  <button style={{ ...botonWhatsapp, display: "flex", alignItems: "center", gap: "10px" }} onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMERO}`, "_blank")}><FaWhatsapp size={20} /> Te ayudamos a elegir</button>
                </div>
                <p style={{ marginTop: "15px", fontSize: "12px", opacity: 0.8, fontWeight: "300", fontStyle: "italic" }}>Respuesta rápida y asesoría personalizada</p>
              </div>
            </div>
          </section>

          {/* SECCIÓN RECONOCIMIENTOS */}
          <section style={{ padding: "40px 24px", background: "#f9f9f9", textAlign: "center", borderBottom: "1px solid #eee" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <img src={process.env.PUBLIC_URL + "/wedding%20awards.png"} alt="Wedding Awards Matrimonio.com.co Atelié Joyería" style={{ height: "150px", marginBottom: "10px", width: "auto" }} />
              <h2 style={{ fontSize: "22px", fontWeight: "bold", fontFamily: "'Times New Roman', Times, serif", color: "#222", letterSpacing: "1px", margin: 0 }}>
                RECONOCIDOS POR NUESTRA CALIDAD Y SERVICIO
              </h2>
            </div>
          </section>

          {/* SECCIÓN TEXTO CENTRAL */}
          <section style={{ padding: "40px 24px", textAlign: "center", background: "#fff" }}>
            <div style={{ marginBottom: "30px", color: "#d4af37" }}>
              <GiCutDiamond size={40} />
            </div>
            <p style={{ maxWidth: "900px", margin: "0 auto 40px", fontSize: "18px", lineHeight: "1.8", color: "#555", fontWeight: "300" }}>
              En Atelié Joyería diseñamos anillos de compromiso y argollas de matrimonio en oro de 18, 14, 10k y plata 950, creados para representar momentos únicos con elegancia, calidad y significado. Explora nuestro catálogo exclusivo o diseña un anillo personalizado a tu medida. Cotiza fácilmente por WhatsApp y encuentra la pieza perfecta para uno de los momentos más importantes de tu vida.
            </p>
            <button style={botonBordeDorado} onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMERO}`, "_blank")}>Cotizar por WhatsApp</button>
          </section>

          {/* SECCIÓN CATEGORÍAS REDISEÑADA */}
          <section id="colecciones" style={{ padding: "30px 24px", background: "#f9f9f9", scrollMarginTop: "120px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
              
              {/* COMPROMISO */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "15px", cursor: "pointer", background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 15px 45px rgba(0,0,0,0.08)" }} 
                   onClick={() => { setView("compromiso"); window.scrollTo(0,0); }}
                   onMouseEnter={(e) => { e.currentTarget.querySelector('.arrow-c').style.transform = 'translateX(8px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.querySelector('.arrow-c').style.transform = 'translateX(0)'; }}>
                <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "10px" }}>
                  <img src={process.env.PUBLIC_URL + "/catalogo/compromiso.png"} loading="lazy" alt="Colección de anillos de compromiso Atelié Joyería" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                </div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "8px", color: "#222", fontFamily: "'Times New Roman', Times, serif" }}>ANILLOS DE COMPROMISO</h2>
                  <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.5", marginBottom: "15px", fontWeight: "300" }}>Diseños únicos para momentos inolvidables.</p>
                  <span style={{ color: "#d4af37", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    Ver Colección <span className="arrow-c" style={{ transition: "transform 0.3s ease", fontSize: "18px" }}>&rarr;</span>
                  </span>
                </div>
              </div>

              {/* MATRIMONIO */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "15px", cursor: "pointer", background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 15px 45px rgba(0,0,0,0.08)" }} 
                   onClick={() => { setView("matrimonio"); window.scrollTo(0,0); }}
                   onMouseEnter={(e) => { e.currentTarget.querySelector('.arrow-m').style.transform = 'translateX(8px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.querySelector('.arrow-m').style.transform = 'translateX(0)'; }}>
                <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "10px" }}>
                  <img src={process.env.PUBLIC_URL + "/catalogo/matrimonio.png"} loading="lazy" alt="Colección de argollas de matrimonio Atelié Joyería" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                </div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "8px", color: "#222", fontFamily: "'Times New Roman', Times, serif" }}>ARGOLLAS DE MATRIMONIO</h2>
                  <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.5", marginBottom: "15px", fontWeight: "300" }}>Símbolos de amor eterno, hechas para acompañarlos siempre.</p>
                  <span style={{ color: "#d4af37", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    Ver Colección <span className="arrow-m" style={{ transition: "transform 0.3s ease", fontSize: "18px" }}>&rarr;</span>
                  </span>
                </div>
              </div>

              {/* DISEÑOS PERSONALIZADOS */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "15px", cursor: "pointer", background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 15px 45px rgba(0,0,0,0.08)" }} 
                   onClick={() => { setView("agendar"); window.scrollTo(0,0); }}
                   onMouseEnter={(e) => { e.currentTarget.querySelector('.arrow-d').style.transform = 'translateX(8px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.querySelector('.arrow-d').style.transform = 'translateX(0)'; }}>
                <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "10px" }}>
                  <img src={process.env.PUBLIC_URL + "/catalogo/disenos.png"} loading="lazy" alt="Diseños personalizados Atelié Joyería" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                </div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "8px", color: "#222", fontFamily: "'Times New Roman', Times, serif" }}>DISEÑOS PERSONALIZADOS</h2>
                  <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.5", marginBottom: "15px", fontWeight: "300" }}>Creamos juntos la joya que imaginas.</p>
                  <span style={{ color: "#d4af37", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    Agendar Cita <span className="arrow-d" style={{ transition: "transform 0.3s ease", fontSize: "18px" }}>&rarr;</span>
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* SECCIÓN CALIDAD QUE TRASCIENDE */}
          <section style={{ padding: "30px 24px 15px", background: "#fff" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold", letterSpacing: "4px", marginBottom: "25px", fontFamily: "'Times New Roman', Times, serif" }}>CALIDAD QUE TRASCIENDE</h2>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px", textAlign: "center" }}>
              <div>
                <div style={{ color: "#d4af37", marginBottom: "20px" }}><FaLeaf size={35} /></div>
                <h4 style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "10px" }}>ORO 18K</h4>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Utilizamos oro 18k de la más alta calidad y origen responsable.</p>
              </div>
              <div>
                <div style={{ color: "#d4af37", marginBottom: "20px" }}><FaShieldAlt size={35} /></div>
                <h4 style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "10px" }}>GARANTÍA DE POR VIDA</h4>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Garantía de por vida en todos nuestros anillos.</p>
              </div>
              <div>
                <div style={{ color: "#d4af37", marginBottom: "20px" }}><GiHammerBreak size={35} /></div>
                <h4 style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "10px" }}>HECHO A MANO</h4>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Cada pieza es elaborada a mano con pasión y precisión.</p>
              </div>
              <div>
                <div style={{ color: "#d4af37", marginBottom: "20px" }}><GiCutDiamond size={35} /></div>
                <h4 style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "10px" }}>CERTIFICACIÓN</h4>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Diamantes y esmeraldas con certificación de autenticidad.</p>
              </div>
            </div>
          </section>

          {/* SECCIÓN TESTIMONIOS (RESEÑAS DE GOOGLE) */}
          <section style={{ padding: "15px 24px 60px", background: "#fdfdfd" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold", letterSpacing: "4px", marginBottom: "10px", fontFamily: "'Times New Roman', Times, serif" }}>LO QUE DICEN NUESTROS CLIENTES</h2>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>5.0</span>
                <div style={{ color: "#d4af37", display: "flex", gap: "3px" }}>
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={18} />)}
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#888", marginTop: "5px", letterSpacing: "0.5px" }}>Calificación promedio basada en opiniones de Google Maps</p>
            </div>
            <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {TESTIMONIOS.map((t, i) => (
                <div key={i} style={{ background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0", textAlign: "center" }}>
                  <div style={{ color: "#d4af37", marginBottom: "15px", display: "flex", justifyContent: "center", gap: "5px" }}>
                    {[...Array(t.estrellas)].map((_, i) => <FaStar key={i} size={14} />)}
                  </div>
                  <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", fontStyle: "italic", marginBottom: "20px" }}>
                    "{t.texto}"
                  </p>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "1px", margin: 0 }}>{t.nombre.toUpperCase()}</h4>
                  <span style={{ fontSize: "11px", color: "#aaa", marginTop: "5px", display: "block" }}>Reseña de Google</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <a 
                href="https://www.google.com/maps" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: "#d4af37", textDecoration: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "1px", borderBottom: "1px solid #d4af37", paddingBottom: "2px" }}>
                VER TODAS LAS RESEÑAS EN GOOGLE
              </a>
            </div>
          </section>

          {/* SECCIÓN TALLER */}
          <section style={{ height: "60vh", position: "relative", overflow: "hidden" }}>
            <img src={process.env.PUBLIC_URL + "/nosotros-atelie.jpg"} alt="Taller Atelié" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 20px", color: "white" }}>
              <div style={{ textAlign: "center", maxWidth: "600px" }}>
                <h2 style={{ fontWeight: "bold", fontSize: "42px", letterSpacing: "2px", margin: 0, fontFamily: "'Times New Roman', Times, serif" }}>Diseñamos historias</h2>
                <h2 style={{ fontWeight: "bold", fontSize: "42px", letterSpacing: "2px", marginBottom: "20px", color: "#d4af37", fontFamily: "'Times New Roman', Times, serif" }}>que perduran</h2>
                <p style={{ marginBottom: "35px", fontSize: "18px", opacity: 0.9 }}>En nuestro taller en Medellín, cada detalle importa. Creamos más que joyas, creamos recuerdos.</p>
                <button style={botonPrincipal} onClick={() => { setView("agendar"); window.scrollTo(0,0); }}>Diseña tu anillo con nosotros</button>
              </div>
            </div>
          </section>

          {/* SECCIÓN FINAL (BENEFICIOS) */}
          <section style={{ padding: "40px 24px", background: "#f9f9f9" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "50px", textAlign: "center" }}>
              <div>
                <FaWhatsapp size={24} style={{ color: "#25D366", marginBottom: "15px" }} />
                <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Atención personalizada</h4>
                <p style={{ fontSize: "14px", color: "#777" }}>Te asesoramos en cada paso por WhatsApp.</p>
              </div>
              <div>
                <FaTruck size={24} style={{ color: "#d4af37", marginBottom: "15px" }} />
                <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Envíos seguros</h4>
                <p style={{ fontSize: "14px", color: "#777" }}>Envíos a todo el país con seguridad y confianza.</p>
              </div>
              <div>
                <FaShieldAlt size={24} style={{ color: "#d4af37", marginBottom: "15px" }} />
                <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Pagos seguros</h4>
                <p style={{ fontSize: "14px", color: "#777" }}>Múltiples medios de pago protegidos.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {view === "nosotros" && (
        <>
          <section style={{ padding: "30px 24px 0", maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "35px", letterSpacing: "4px", fontFamily: "'Times New Roman', Times, serif" }}>QUIÉNES SOMOS</h2>
            <div style={{ textAlign: "justify", maxWidth: "900px", margin: "0 auto 20px", fontSize: "16px", lineHeight: "1.6", color: "#444", display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ margin: 0 }}>
                ATELIÊ es una marca familiar fundada en 2010 en Medellín, donde la tradición artesanal y el diseño contemporáneo se unen para crear joyas que trascienden el tiempo.
              </p>
              <p style={{ margin: 0 }}>
                Nos especializamos en el diseño y fabricación de anillos de compromiso y argollas de matrimonio en oro de 18K, 14K, 10K y plata 950, elaboradas cuidadosamente para representar historias únicas e irrepetibles.
              </p>
              <p style={{ margin: 0 }}>
                Cada pieza es creada a mano en nuestro taller con atención minuciosa a cada detalle, reflejando nuestro compromiso con la excelencia, la autenticidad y la calidad. Más que joyas, creamos símbolos que acompañarán los momentos más importantes de tu vida.
              </p>
            </div>

            {/* BLOQUE 1: TALLER Y GARANTÍA (Imagen Izquierda) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "45px", alignItems: "center", marginBottom: "40px" }}>
              <div 
                style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0", cursor: "pointer" }}
                onClick={() => setSelectedImage(process.env.PUBLIC_URL + "/nosotros-atelie.jpg")}
              >
                <img src={process.env.PUBLIC_URL + "/nosotros-atelie.jpg"} alt="ATELIÊ — equipo y taller" 
                  style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.3s ease" }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#d4af37", marginBottom: "10px", letterSpacing: "1px" }}>HECHO EN NUESTRO TALLER</h4>
                  <p style={{ lineHeight: "1.7", color: "#666", fontSize: "15px", margin: 0, textAlign: "justify" }}>
                    Nuestras joyas nacen en el corazón de nuestro taller propio en Medellín. Al controlar cada etapa de la fabricación, garantizamos que cada anillo cumpla con los más altos estándares de calidad y trazabilidad, transformando materiales nobles en símbolos de amor.
                  </p>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: PROCESO ARTESANAL (Imagen Derecha) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "45px", alignItems: "center", marginBottom: "40px" }}>
              <div style={{ order: isMobile ? 1 : 2 }}>
                <div 
                  style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0", cursor: "pointer" }}
                  onClick={() => setSelectedImage(process.env.PUBLIC_URL + "/Proceso artesanal.png")}
                >
                  <img src={process.env.PUBLIC_URL + "/Proceso artesanal.png"} alt="Proceso artesanal Atelié" 
                    style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.3s ease" }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} />
                </div>
              </div>
              <div style={{ order: isMobile ? 2 : 1 }}>
                <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#d4af37", marginBottom: "10px", letterSpacing: "1px" }}>PROCESO ARTESANAL</h4>
                <p style={{ lineHeight: "1.6", color: "#666", fontSize: "15px", margin: 0, textAlign: "justify" }}>
                  Creemos que las piezas más especiales requieren tiempo, precisión y dedicación. Por eso, cada joya es elaborada artesanalmente en nuestro taller, cuidando cada etapa del proceso con pasión y excelencia.
                  <br />
                  Desde la transformación del metal precioso hasta el delicado engaste de cada piedra, nuestras manos dan vida a piezas únicas que representan historias, emociones y momentos destinados a perdurar para siempre.
                </p>
              </div>
            </div>

            {/* BLOQUE 3: RELACIÓN (Imagen Izquierda) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "45px", alignItems: "center", marginBottom: "40px" }}>
              <div 
                style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0", cursor: "pointer" }}
                onClick={() => setSelectedImage(process.env.PUBLIC_URL + "/relacion.png")}
              >
                <img src={process.env.PUBLIC_URL + "/relacion.png"} alt="Relación permanente — servicios de cuidado" 
                  style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.3s ease" }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} />
              </div>
              <div>
                <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#d4af37", marginBottom: "10px", letterSpacing: "1px" }}>RELACIÓN PARA TODA LA VIDA</h4>
                <p style={{ margin: 0, fontSize: "15px", color: "#666", lineHeight: "1.6", textAlign: "justify" }}>
                  Nuestro compromiso continúa mucho después de la entrega. Ofrecemos un vínculo permanente que incluye servicios de limpieza profesional y revisión técnica de engastes cada 6 meses sin costo adicional. Queremos acompañarte en el cuidado de tus joyas para que brillen como el primer día.
                </p>
              </div>
            </div>

            {/* BLOQUE 4: GARANTÍA (Destacado) */}
            <div style={{ background: "#fdfdfd", padding: isMobile ? "30px 20px" : "40px 60px", borderRadius: "20px", border: "1px solid #f0f0f0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", marginBottom: "40px" }}>
              <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#d4af37", marginBottom: "15px", letterSpacing: "1px", textAlign: "center" }}>GARANTÍA DE POR VIDA</h4>
              <div style={{ maxWidth: "850px", margin: "0 auto", lineHeight: "1.7", color: "#666", fontSize: "15px", display: "flex", flexDirection: "column", gap: "15px", textAlign: "justify" }}>
                <p style={{ margin: 0 }}>
                  En Atelié Joyería confiamos en la excelencia de nuestros materiales y procesos de fabricación. Por ello, ofrecemos garantía de por vida sobre la autenticidad e integridad de los materiales y piedras utilizadas en nuestras joyas.
                </p>
                <p style={{ margin: 0 }}>
                  La garantía cubre exclusivamente defectos de fabricación y calidad del material. No cubre daños ocasionados por uso inadecuado, golpes, accidentes, rayones, deformaciones, desgaste natural, exposición a químicos o manipulación por terceros.
                </p>
              </div>
            </div>
          </section>

          <section style={{ padding: "30px 24px", background: "#fff" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold", letterSpacing: "4px", marginBottom: "25px", fontFamily: "'Times New Roman', Times, serif" }}>CALIDAD QUE TRASCIENDE</h2>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", textAlign: "center" }}>
              {BENEFICIOS_NOSOTROS.map(({ Icon, titulo, texto }) => (
                <div key={titulo}>
                  <div style={{ color: "#d4af37", marginBottom: "20px" }}>
                    <Icon size={35} />
                  </div>
                  <h4 style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "10px" }}>
                    {titulo}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                    {texto}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN RECONOCIMIENTOS */}
          <section style={{ padding: "30px 24px", background: "#f9f9f9", textAlign: "center", borderBottom: "1px solid #eee" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <img src={process.env.PUBLIC_URL + "/wedding%20awards.png"} alt="Wedding Awards Matrimonio.com.co Atelié Joyería" style={{ height: "150px", marginBottom: "10px", width: "auto" }} />
              <h2 style={{ fontSize: "22px", fontWeight: "bold", fontFamily: "'Times New Roman', Times, serif", color: "#222", letterSpacing: "1px", margin: 0 }}>
                RECONOCIDOS POR NUESTRA CALIDAD Y SERVICIO
              </h2>
            </div>
          </section>
        </>
      )}

      {view === "servicios" && (
        <section style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "50px", letterSpacing: "3px", fontFamily: "'Times New Roman', Times, serif" }}>SERVICIOS ESPECIALIZADOS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", marginBottom: "80px" }}>
            {[
              { title: "REPARACIÓN", img: process.env.PUBLIC_URL + "/reparacion.jpg" },
              { title: "RESTAURACIÓN", img: process.env.PUBLIC_URL + "/restauracion.jpg" },
              { title: "MANTENIMIENTO", img: process.env.PUBLIC_URL + "/mantenimiento.jpg" }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{ borderRadius: "15px", height: "300px", marginBottom: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                  <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ letterSpacing: "2px" }}>{item.title}</h3>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: "550px", margin: "0 auto", background: "#fff", padding: "50px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
            <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Cuéntanos qué necesitas</h4>
            <input style={inputStyle} placeholder="Tu nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
            <input style={inputStyle} placeholder="WhatsApp / Teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />

            <select style={inputStyle} value={servicio} onChange={(e)=>setServicio(e.target.value)}>
              <option value="">Selecciona el servicio</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Reparación">Reparación</option>
              <option value="Restauración">Restauración</option>
            </select>

            <textarea
              style={{...inputStyle, height: "120px", resize: "none"}}
              placeholder="Describe detalladamente el servicio que necesitas (ej: cambio de talla, limpieza, reposición de piedra...)"
              value={descripcion}
              onChange={(e)=>setDescripcion(e.target.value)}
            />

            <button style={botonPrincipal} onClick={enviarWhatsApp}>SOLICITAR VALORACIÓN</button>
          </div>
        </section>
      )}

      {(view === "compromiso" || view === "matrimonio") && (
        <section style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "4px", marginBottom: "40px", fontFamily: "'Times New Roman', Times, serif" }}>{view === "compromiso" ? "Anillos de Compromiso" : "Argollas de Matrimonio"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {(view === "compromiso" ? compromiso : matrimonio).map(p => (
              <div key={p.id} style={{ border: "1px solid #f5f5f5", padding: "15px", textAlign: "center", borderRadius: "10px", background: "#fff" }}>
                <div 
                  style={{ height: "180px", background: p.img ? "#fafafa" : "#fbfbfb", borderRadius: "6px", marginBottom: "12px", overflow: "hidden", cursor: "pointer" }}
                  onClick={() => setSelectedImage(p.img)}
                >
                  {p.img ? (
                    <img src={p.img} loading="lazy" alt={`${p.name} - Joyería Atelié Anillo en oro 18k`} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  ) : null}
                </div>
                <h4 style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "500" }}>{p.name}</h4>
                <button style={{ ...botonPrincipal, padding: "8px 16px", fontSize: "12px" }} onClick={() => { setReferencia(p.name); setQuotedImage(p.img); setTipoProducto(view); setView("personalizar"); window.scrollTo(0, 0); }}>COTIZAR</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "personalizar" && (
        <section style={{ padding: "80px 20px", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "12px", letterSpacing: "2px", fontFamily: "'Times New Roman', Times, serif" }}>COTIZA TU DISEÑO</h2>
          <p style={{ textAlign: "center", color: "#666", fontSize: "15px", lineHeight: "1.5", margin: "0 0 36px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            Indica referencia, talla, metal, color del metal y piedra. Te respondemos por WhatsApp.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "flex-start" }}>
            {/* Columna Izquierda: Imagen */}
            <div style={{ flex: "1", minWidth: isMobile ? "100%" : "280px", textAlign: "center", position: isMobile ? "static" : "sticky", top: isMobile ? "auto" : "120px", marginBottom: isMobile ? "20px" : "0" }}>
              <div style={{ background: "#fdfdfd", padding: "20px", borderRadius: "20px", border: "1px solid #f0f0f0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <img src={quotedImage || (process.env.PUBLIC_URL + "/atelie_Logo.png")} alt="Referencia" style={{ width: "100%", maxHeight: "320px", objectFit: "contain", borderRadius: "10px" }} />
                <p style={{ marginTop: "15px", fontWeight: "600", color: "#d4af37", letterSpacing: "1px" }}>{referencia || "Personaliza tu joya"}</p>
              </div>
            </div>

            {/* Columna Derecha: Formulario */}
            <div style={{ flex: "1.5", minWidth: "300px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", background: "#fff", padding: "40px 44px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
            <h3 style={cotizarSectionTitle}>DETALLE DEL ANILLO</h3>
            {referencia === "Diseño Cliente" && (
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px", textAlign: "center", fontStyle: "italic" }}>
                ¿Prefieres una asesoría presencial? <span onClick={() => { setView("agendar"); window.scrollTo(0, 0); }} style={{ color: "#d4af37", cursor: "pointer", fontWeight: "600", textDecoration: "underline" }}>Agenda una cita aquí</span>.
              </p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              {referencia === "Diseño Cliente" && (
                <div style={fieldGroup}>
                  <span style={labelStyle}>Tipo de Joya</span>
                  <select style={inputStyle} value={tipoProducto} onChange={(e) => setTipoProducto(e.target.value)}>
                    <option value="compromiso">Anillo de Compromiso</option>
                    <option value="matrimonio">Argollas de Matrimonio</option>
                  </select>
                </div>
              )}
              <div style={fieldGroup}>
                <span style={labelStyle}>Referencia</span>
                <input style={inputStyle} placeholder="Ej: Ref 301" value={referencia} onChange={(e)=>setReferencia(e.target.value)} />
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>{tipoProducto === "matrimonio" ? "Talla 1" : "Talla"}</span>
                <select style={inputStyle} value={talla} onChange={(e)=>setTalla(e.target.value)}>
                  <option value="">Selecciona talla</option>
                  {TALLAS_ANILLO.map((t) => (
                    <option key={t.valor} value={t.valor}>{t.etiqueta}</option>
                  ))}
                </select>
              </div>
              {tipoProducto === "matrimonio" && (
                <div style={fieldGroup}>
                  <span style={labelStyle}>Talla 2</span>
                  <select style={inputStyle} value={talla2} onChange={(e)=>setTalla2(e.target.value)}>
                    <option value="">Selecciona talla</option>
                    {TALLAS_ANILLO.map((t) => (
                      <option key={t.valor} value={t.valor}>{t.etiqueta}</option>
                    ))}
                  </select>
                </div>
              )}
              <div style={fieldGroup}>
                <span style={labelStyle}>Metal</span>
                <select style={inputStyle} value={metal} onChange={(e)=>setMetal(e.target.value)}>
                  <option value="">Selecciona metal</option>
                  <option value="Oro 10K">Oro 10K</option>
                  <option value="Oro 14K">Oro 14K</option>
                  <option value="Oro 18K">Oro 18K</option>
                  <option value="Plata 950">Plata 950</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>Color del metal</span>
                <select style={inputStyle} value={colorMetal} onChange={(e)=>setColorMetal(e.target.value)}>
                  <option value="">Selecciona color</option>
                  <option value="Amarillo">Amarillo</option>
                  <option value="Rosado">Rosado</option>
                  <option value="Blanco">Blanco</option>
                </select>
              </div>
              <div style={{ ...fieldGroup, gridColumn: "1 / -1", maxWidth: "100%" }}>
                <span style={labelStyle}>Piedra</span>
                <select style={inputStyle} value={piedra} onChange={(e)=>setPiedra(e.target.value)}>
                  <option value="">Selecciona piedra</option>
                  <option value="Diamante">Diamante</option>
                  <option value="Zafiro">Zafiro</option>
                  <option value="Esmeralda">Esmeralda</option>
                  <option value="Moissanita">Moissanita</option>
                  <option value="Circon">Circon</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
              {!quotedImage && (
                <p style={{ gridColumn: "1 / -1", margin: "-10px 0 0 0", fontSize: "13px", color: "#b8962e", fontStyle: "italic", lineHeight: "1.4" }}>
                  Por favor enviar foto del diseño de las argollas o sortija de compromiso al WhatsApp, gracias
                </p>
              )}
            </div>

            <h3 style={{ ...cotizarSectionTitle, marginTop: "8px" }}>TUS DATOS</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <div style={fieldGroup}>
                <span style={labelStyle}>Nombre</span>
                <input style={inputStyle} placeholder="Tu nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>Teléfono / WhatsApp</span>
                <input style={inputStyle} placeholder="Número de contacto" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
              </div>
            </div>

            <button type="button" style={{ ...botonPrincipal, marginTop: "12px", alignSelf: "center", width: "100%", maxWidth: "320px" }} onClick={enviarCotizacion}>ENVIAR A WHATSAPP</button>
          </div>
            </div>
          </div>
        </section>
      )}

      {view === "agendar" && (
        <section style={{ padding: "30px 20px 80px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "12px", letterSpacing: "2px", fontFamily: "'Times New Roman', Times, serif" }}>AGENDAR CITA DE DISEÑO</h2>
          <p style={{ textAlign: "center", color: "#666", fontSize: "15px", lineHeight: "1.5", margin: "0 0 36px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            Reserva un espacio con nuestros expertos para dar vida a tu diseño único. Atención personalizada en nuestro taller en Medellín.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px", alignItems: "start" }}>
            {/* COLUMNA IZQUIERDA: FORMULARIO */}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", background: "#fff", padding: "40px 44px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div style={fieldGroup}>
                <span style={labelStyle}>Fecha preferida</span>
                <input type="date" style={inputStyle} value={citaFecha} onChange={(e) => setCitaFecha(e.target.value)} />
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>Hora preferida</span>
                <select style={inputStyle} value={citaHora} onChange={(e) => setCitaHora(e.target.value)}>
                  <option value="">Selecciona jornada</option>
                  <option value="Lunes a Viernes (2:00 PM - 7:00 PM)">Lunes a Viernes (2:00 PM - 7:00 PM)</option>
                  <option value="Sábado (9:00 AM - 12:00 PM)">Sábado (9:00 AM - 12:00 PM)</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>Nombre</span>
                <input style={inputStyle} placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div style={fieldGroup}>
                <span style={labelStyle}>Teléfono / WhatsApp</span>
                <input style={inputStyle} placeholder="Número de contacto" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
            </div>
            <button type="button" style={{ ...botonPrincipal, marginTop: "12px", alignSelf: "center", width: "100%", maxWidth: "320px" }} onClick={enviarCitaWhatsApp}>SOLICITAR CITA POR WHATSAPP</button>
          </div>

            {/* COLUMNA DERECHA: UBICACIÓN Y MAPA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ background: "#fff", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
                <h3 style={{ ...cotizarSectionTitle, color: "#d4af37", borderBottom: "1px solid #d4af37", fontFamily: "'Times New Roman', Times, serif", fontSize: "16px", fontWeight: "bold" }}>VISÍTANOS</h3>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.6", marginBottom: "25px" }}>
                  <strong>Atelié Joyería y Accesorios</strong><br />
                  Cra. 83B No. 32 EE-35<br />
                  Laureles la Castellana<br />
                  Medellín, Colombia
                </p>
                <div style={{ borderRadius: "15px", overflow: "hidden", height: "350px", border: "1px solid #eee" }}>
                  <iframe 
                    title="Mapa de ubicación de Atelié Joyería"
                    src="https://maps.google.com/maps?q=Atelie%20Joyer%C3%ADa%20y%20Accesorios%20Cra%2083B%2032EE-35%20Medellin&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <button 
                    style={{ ...botonBordeDorado, width: "100%", fontSize: "13px" }}
                    onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Atelie+Joyeria+y+Accesorios+Medellin+Cra+83B", "_blank")}
                  >
                    VER EN GOOGLE MAPS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: "#0f0f0f", color: "white", padding: "60px 40px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "60px" }}>
          <div>
            <h4 style={{ color: "#d4af37", marginBottom: "30px", letterSpacing: "2px" }}>NAVEGACIÓN</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setView("home"); window.scrollTo(0,0)}}>Inicio</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setView("nosotros"); window.scrollTo(0,0)}}>Nosotros</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setView("compromiso"); window.scrollTo(0,0)}}>Anillos de Compromiso</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setView("matrimonio"); window.scrollTo(0,0)}}>Argollas de Matrimonio</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setView("servicios"); window.scrollTo(0,0)}}>Servicios</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { setView("agendar"); window.scrollTo(0, 0); }}>Agendar Cita</span>
              <span style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { setView("personalizar"); setTipoProducto("compromiso"); setReferencia("Diseño Cliente"); setQuotedImage(null); window.scrollTo(0, 0); }}>Cotizar</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#d4af37", marginBottom: "30px", letterSpacing: "2px" }}>SÍGUENOS</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <a href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noreferrer" style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><FaWhatsapp size={22} /> WhatsApp Ateliê</a>
              <a href="mailto:contacto@atelie.com.co" style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><FaEnvelope size={22} /> contacto@atelie.com.co</a>
              <a href="https://www.instagram.com/atelie.accesorios/" target="_blank" rel="noreferrer" style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><FaInstagram size={22} /> Instagram</a>
              <a href="https://www.facebook.com/atelieaccesorios" target="_blank" rel="noreferrer" style={footerLinkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><FaFacebook size={22} /> Facebook</a>
            </div>
          </div>
          <div onClick={() => { setView("agendar"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>
          <div>
            <h4 style={{ color: "#d4af37", marginBottom: "30px", letterSpacing: "2px" }}>UBICACIÓN</h4>
            <p style={{ color: "#ccc", fontSize: "15px", lineHeight: "1.8" }}>Cra. 83B No. 32 EE-35<br />Laureles la Castellana<br />Medellín, Colombia<br />Telefono/whatsapp: +(57) 316 255-9987</p>
          </div>
        </div>
        </div>
      </footer>

      {selectedImage && (
        <div style={modalOverlayStyle} onClick={() => setSelectedImage(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{ position: "absolute", top: "-50px", right: "0", background: "none", border: "none", color: "#fff", fontSize: "50px", cursor: "pointer", lineHeight: "1" }}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Detalle Atelié" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: (selectedImage === "/nosotros-atelie.jpg" || selectedImage === "/Proceso artesanal.png") ? "90vh" : "80vh", 
                objectFit: "contain", 
                display: "block" 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
