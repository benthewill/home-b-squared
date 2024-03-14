"use client";

import { Chip } from "@nextui-org/react";

export default function GenreChips({ genreArray, size = "lg", style }) {
  return (
    <div className="flex flex-wrap justify-start gap-2.5 pl-4 md:pl-0">
      {genreArray.map((genreItem) => {
        return (
          <Chip
            key={genreItem}
            radius="sm"
            size={size}
            variant={style}
            color="warning"
          >
            <p className="font-bold">{genreItem}</p>
          </Chip>
        );
      })}
    </div>
  );
}
