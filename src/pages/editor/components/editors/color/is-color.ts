const RGB_COLOR = /^[rR][gG][bB]\(\s*[0-9]{1,3},\s*[0-9]{1,3},\s*[0-9]{1,3}\)$/;
const RGBA_COLOR = /^[rR][gG][bB][aA]\(\s*[0-9]{1,3},\s*[0-9]{1,3},\s*[0-9]{1,3},\s*[0-9]{1,3}\)$/;
const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;

export default function isColor(value: string): boolean {
  return RGB_COLOR.test(value) || RGBA_COLOR.test(value) || HEX_COLOR.test(value);
}
