import React from "react";

function BlogsModel({show,blog,onclose}) {
    if(!show){
        return null
    }
  return (
    <div>
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
          <span className="absolute top-4 right-8 text-[2rem] cursor-pointer text-white ">
            {" "}
            <i onClick={onclose}
             className="fa-solid fa-xmark"></i>
          </span>
          {
            <>
              <img
                className="w-[100%] h-auto max-h-[30rem] object-cover opacity-50 border-[.1rem] rounded-2xl"
                src={blog.image}
                alt={blog.title}
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
                {blog.title}
              </h2>

              <p
                style={{
                   overflowY:"scroll",
                  fontFamily:"Comfortan,sans-serif",
                  minHeight:"21rem",
                  fontSize: "1.4rem",
                  marginTop: "2rem",
                  lineHeight: "2.7rem",
                  color: "#bbb",
                  // Firefox hides scrollbar
                
                }}
              >
                {blog.content}
              </p>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default BlogsModel;
