export function ImgArrPreview({ images, handleImageRemove }) {
  return (
    <div className="imgArrPreview">
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            height: "70px",
            width: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={img.url} alt={`Product ${idx}`} />
          <button
            onClick={(e) => {
              handleImageRemove(e, idx);
            }}
            style={{
              height: "20px",
              width: "50px",
              fontSize: "10px",
              backgroundColor: "rgb(255, 147, 147)",
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
