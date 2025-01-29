import React from "react";
import demo from "../assets/images/demo.jpg";
function NewsModel({ show, article, onclose }) {
  if (!show) {
    return null;
  }
  return (
    <div
      className=""
      style={{
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: "1000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className=" relative w-[90%] max-w-[60rem] h-auto max-h-[100%] bg-[#111214] p-16 rounded-2xl shadow-[0 0 5rem 4rem rbga(0,0,0,0.5)]">
        <span
          onClick={onclose}
          className="absolute top-4 right-8 text-[2rem] cursor-pointer text-white "
        >
          {" "}
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              className="w-[100%] h-auto max-h-[30rem] object-cover opacity-50 border-[.1rem] rounded-2xl"
              src={article.image}
              alt={article.title}
            />
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "2rem",
                color: "#fff",
                letterSpacing: "0.1rem",
                marginTop: "2rem",
              }}
            >
              {article.title}
            </h2>
            <p
              style={{
                fontFamily: "'Comforta',sans-serif",
                fontSize: "1.4rem",
                color: "#bbb",
                marginTop: "1rem",
              }}
            >
              {article.source.name}
            </p>
            <p
              style={{
                fontFamily: "'Comforta',sans-serif",
                fontSize: "1.4rem",
                color: "#bbb",
                marginTop: "1rem",
              }}
            >
              {new Date(article.publishedAt).toLocaleString("en-In", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p
              style={{
                fontSize: "1.6rem",
                marginTop: "2rem",
                lineHeight: "2.7rem",
                color: "#ddd",
              }}
            >
              {article.content}
            </p>
            <a
              className="active:translate-y-[0.1rem]"
              style={{
                width: "15rem",
                display: "inline-block",
                background: "linear-gradient(to right,#b88efc,#6877f4)",
                marginTop: "2rem",
                padding: "1rem 2rem",
                borderRadius: "5rem",
                color: "#fff",
                fontSize: "1.6rem",
                textAlign: "center",
                textDecoration: "uppercase",
                letterSpacing: "0.1rem",
              }}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default NewsModel;
