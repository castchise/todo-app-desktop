import KeyboardButton from "./KeybindButton";

export default function KeybindRow({
  hotkeys,
  description,
}: {
  hotkeys: string[];
  description: string;
}) {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center space-x-1">
        {hotkeys.map((hotkey, id) => (
          <KeyboardButton key={id}>{hotkey}</KeyboardButton>
        ))}
      </div>
      <p className="text-md ml-4 font-light">{description}</p>
    </div>
  );
}
