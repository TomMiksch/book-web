export class IsbnQuery {
  items: Item[] = [];
}

export class Item {
  volumeInfo: VolumeInfo | undefined;
}

export class VolumeInfo {
  title: string | undefined;
  authors: string[] = [];
  publisher: string | undefined;
}
