import React, { FC } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { BsFillSendFill } from "react-icons/bs";

const PREVIEW_MESSAGES = [
  { id: 1, message: "Beunas Dias!, Que tal?", isSent: false },
  {
    id: 2,
    message: "Estoy genial, Trabajo a una proyecto favorito!",
    isSent: true,
  },
];

const Settings: FC = (): React.JSX.Element => {
  const { theme, setTheme } = useThemeStore();

  return (
    <section className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Themes</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your ChatIt interface :)
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((th) => (
            <button
              key={th}
              className={`group flex flex-col items-center gap-1.5 rounded-lg transition-colors ${
                theme === th ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(th)}
            >
              <div
                className="relative h-8 rounded-md overflow-hidden"
                data-theme={th}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary" />
                  <div className="rounded bg-secondary" />
                  <div className="rounded bg-accent" />
                  <div className="rounded bg-neutral" />
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {th.charAt(0).toUpperCase() + th.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold">Preview of the Theme</h3>
        <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 border-[2px]">
          {PREVIEW_MESSAGES.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isSent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%] rounded-xl p-3 shadow-sm
                  ${
                    message.isSent
                      ? "bg-primary text-primary-content"
                      : "bg-base-200"
                  }
                `}
              >
                <p className="text-sm">{message.message}</p>
                <p
                  className={`
                    text-[10px] mt-1.5
                    ${
                      message.isSent
                        ? "text-primary-content/70"
                        : "text-base-content/70"
                    }
                  `}
                >
                  12:00 PM
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1 text-sm h-10"
              placeholder="Type a message..."
              value="This is a preview"
              readOnly
            />
            <button className="btn btn-primary h-10 min-h-0">
              <BsFillSendFill />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
