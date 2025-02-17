"use client";

import { useLanyardWS } from "use-lanyard";
import { FaDiscord, FaSpotify } from "react-icons/fa";
import Image from "next/image";

const DISCORD_ID = "997063531763617803";

const Discord = () => {
  const lanyard = useLanyardWS(DISCORD_ID);
  const status = lanyard?.discord_status || "offline";

  const statusColors = {
    online: "bg-emerald-500",
    idle: "bg-amber-500",
    dnd: "bg-rose-500",
    offline: "bg-zinc-400",
  };

  const customStatus = lanyard?.activities?.find(
    (activity) => activity.type === 4
  );

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="rounded-full bg-zinc-100 dark:bg-zinc-800">
            {lanyard?.discord_user?.avatar ? (
              <Image
                src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${lanyard.discord_user.avatar}`}
                alt="Discord Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaDiscord className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
              </div>
            )}
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white dark:border-black ${statusColors[status]}`}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-base text-zinc-900 dark:text-zinc-100">
            {lanyard?.discord_user?.global_name ||
              lanyard?.discord_user?.username ||
              "Loading..."}
          </p>
          {customStatus && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              &quot;{customStatus.state}&quot;
            </p>
          )}
        </div>
      </div>

      {lanyard?.activities?.map(
        (activity, index) =>
          activity.type === 2 &&
          activity.name === "Spotify" && (
            <div key={index}>
              <span className="text-sm text-muted-foreground dark:text-zinc-400">
                Listening to
              </span>
              <div className="flex items-center gap-4 mt-2">
                {activity.assets?.large_image ? (
                  <Image
                    src={activity.assets.large_image.replace(
                      "spotify:",
                      "https://i.scdn.co/image/"
                    )}
                    alt="Album Art"
                    width={64}
                    height={64}
                    className="rounded"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded">
                    <FaSpotify className="w-6 h-6 text-emerald-500" />
                  </div>
                )}
                <div className="min-w-0">
                  <a
                    href={`https://open.spotify.com/track/${activity.sync_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-zinc-900 dark:text-zinc-100 truncate hover:line-through"
                  >
                    {activity.details}
                  </a>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {activity.state}
                  </p>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Discord;
