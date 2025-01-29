import React from "react";
import noImg from "../assets/images/no-img.png";

function BookMarks({
  show,
  bookmarks,
  onclose,
  onSelectArticle,
  onDeleteBookmark,
}) {
  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: "999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      
    >
      <div className="relative w-[90%] max-w-[60rem] h-auto max-h-[100%] bg-[#111214] p-16 rounded-2xl shadow-[0_0_5rem_4rem_rgba(0,0,0,0.5)]">
        <span
          onClick={onclose}
          className="absolute top-4 right-8 text-[2rem] cursor-pointer text-white"
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2
          id="bookmarks-title"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "3rem",
            fontWeight: "300",
            letterSpacing: "0.1rem",
            color: "#ddd",
            marginBottom: "2rem",
          }}
        >
          Bookmarked News
        </h2>
        <div className="flex flex-col gap-y-4">
          {bookmarks.map((article) => (
            <div
              onClick={() => onSelectArticle(article)}
              key={article.id || article.title}
              className="flex flex-row items-center justify-between gap-x-8"
            >
              <img
                className="w-[7rem] h-[7rem] object-cover rounded-xl mr-4"
                src={article.image || noImg}
                alt={article.title || "No Title"}
              />
              <h3
                style={{
                  fontFamily: "Comfortaa, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {article.title || "Untitled Article"}
              </h3>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(article);
                }}
                className="text-[2.4rem] text-[#b88efc] cursor-pointer"
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookMarks;
