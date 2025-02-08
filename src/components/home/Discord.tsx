"use client";

import React from "react";
import { useLanyardWS } from "use-lanyard";

const id = "997063531763617803";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { SmallSkeleton } from "./Skeleton";
import { ArrowUpRight } from "lucide-react";


export default function Discord() {
  const lanyard = useLanyardWS(id);

  if (!lanyard) {
    return <SmallSkeleton />;
  }

  const status = lanyard.discord_status ?? "offline";

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png`}
              alt={lanyard.discord_user.username}
            />
            <AvatarFallback>{lanyard.discord_user.username}</AvatarFallback>
          </Avatar>
          <div className="-space-y-1">
            <h1 className="font-semibold">
              {lanyard.discord_user.global_name}
            </h1>
            <h3 className="text-sm">
              <span
                className={`${
                  status === "online"
                    ? "text-green-500"
                    : status === "idle"
                    ? "text-yellow-500"
                    : status === "dnd"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-end">
          {lanyard.activities?.some((activity) => activity.type === 4) && (
            <div className="flex items-center gap-2">
              {lanyard.activities
                .filter((activity) => activity.type === 4)
                .map((activity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {activity.emoji?.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      &ldquo;{activity.state}&rdquo;
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {lanyard.activities?.length > 0 && (
        <div className="mt-4 space-y-2">
          {lanyard.activities
            .filter((activity) => activity.type !== 4)
            .map((activity, index) => (
              <div key={index}>
                <span className="text-muted-foreground text-xs">
                  {activity.type === 0 && "Playing "}
                  {activity.type === 1 && "Streaming "}
                  {activity.type === 2 && "Listening to "}
                  {activity.type === 3 && "Watching "}
                  <span className="font-semibold text-orange-500">
                    {activity.name}
                  </span>
                </span>
                <p className="font-medium">
                  {activity.name === "Spotify" ? (
                    <Link
                      href={`https://open.spotify.com/track/${activity.sync_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-500 transition-all flex items-center gap-1"
                    >
                      {activity.details} <ArrowUpRight size={20}/>
                    </Link>
                  ) : (
                    activity.details
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.state}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
