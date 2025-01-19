import { useState } from "react";

export default function TodoItemTitle({ name }: { name: string }) {
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const truncatedTitle = name.substring(0, 75);

  return (
    <p className="order-last mt-4 w-full flex-grow self-center font-semibold sm:order-none sm:mx-4 sm:mt-0">
      {isShowTruncatedText ? truncatedTitle : name}
      {name.length > 75 && (
        <button
          type="button"
          onClick={() => setIsShowTruncatedText(!isShowTruncatedText)}
          className="ml-0.5 hover:underline"
        >
          [...]
        </button>
      )}
    </p>
  );
}
