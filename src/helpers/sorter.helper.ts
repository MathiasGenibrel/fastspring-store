export class Sort {
  public static byAscending<T>(array: T[], key: keyof T): T[] {
    return array.toSorted((a, b) =>
      a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0,
    );
  }

  public static byDescending<T>(array: T[], key: keyof T): T[] {
    return array.toSorted((a, b) =>
      a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0,
    );
  }
}
