"use client";

import { useState } from "react";

export default function DiaryPage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>피부 일기 테스트 페이지</h1>
      
      <button 
        onClick={() => {
          setCount(count + 1);
          alert("버튼이 클릭되었습니다!");
          console.log("버튼 클릭됨!");
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ec4899",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        테스트 버튼 (클릭 횟수: {count})
      </button>

      <p style={{ marginTop: "20px" }}>
        이 버튼이 클릭되나요? 
      </p>
    </div>
  );
}