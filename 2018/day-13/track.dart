enum Track {
  vertical, // "|"
  horizontal, // "-"
  curveLeft, // "\"
  curveRight, // "/"
  intersection // "+"
}

String trackToString(Track track) {
  switch (track) {
    case Track.vertical:
      return '|';
    case Track.horizontal:
      return '-';
    case Track.curveLeft:
      return '\\';
    case Track.curveRight:
      return '/';
    case Track.intersection:
      return '+';
  }
}

Track getTrack(String inputValue) {
  switch (inputValue) {
    case '|':
      return Track.vertical;
    case '-':
      return Track.horizontal;
    case '\\':
      return Track.curveLeft;
    case '/':
      return Track.curveRight;
    case '+':
      return Track.intersection;
    default:
      return null;
  }
}
