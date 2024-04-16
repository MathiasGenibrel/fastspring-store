export class StringHelper {
  public static removeHtmlTags(text: string) {
    const htmlTagsPattern = /<[^>]+>/g;

    return text.replace(htmlTagsPattern, "");
  }
}
