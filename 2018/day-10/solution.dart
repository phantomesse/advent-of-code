import 'sky.dart';


void main() {
  final sky = new Sky('input.txt');
  int boundingBoxSize = sky.boundingBoxSize;
  int seconds = 0;
  while (true) {
    sky.advancePlanes(1);
    if (sky.boundingBoxSize <= boundingBoxSize) {
      boundingBoxSize = sky.boundingBoxSize;
    } else {
      break;
    }
    seconds++;
  }
  sky.advancePlanes(-1);
  print(seconds);
  print(sky);
}
