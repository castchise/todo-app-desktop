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
        {hotkeys.map((hotkey) => (
          <KeyboardButton>{hotkey}</KeyboardButton>
        ))}
      </div>
      <p className="ml-4 text-md">{description}</p>
    </div>
  );
}
