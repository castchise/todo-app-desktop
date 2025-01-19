import { useState } from "react";

export default function TodoItemTitle({ name }: { name: string }) {
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const truncatedTitle = name.substring(0, 75);

  return (
    <p className="font-semibold self-center order-last w-full flex-grow mt-4 sm:mt-0 sm:order-none sm:mx-4">
      {isShowTruncatedText ? truncatedTitle : name}
      {name.length > 75 && (
        <button
          type="button"
          onClick={() => setIsShowTruncatedText(!isShowTruncatedText)}
          className="hover:underline ml-0.5"
        >
          [...]
        </button>
      )}
    </p>
  );
}
