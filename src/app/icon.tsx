import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          color: "#f2f2f3",
          fontSize: 11,
          letterSpacing: -0.5,
          fontWeight: 600,
          fontFamily: "monospace",
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(255,255,255,0.16)",
        }}
      >
        JCK
      </div>
    ),
    size
  );
}
