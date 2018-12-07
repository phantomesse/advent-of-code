import 'dart:math';

import 'step.dart';

class Worker {
  final String name;
  Step currentTask;
  int timeToCompletion = 0;

  Worker(int index) : name = 'Worker $index';

  void giveTask(Step step) {
    currentTask = step;
    timeToCompletion = step.seconds;
  }

  void advanceInTime() => timeToCompletion = max(timeToCompletion - 1, 0);

  bool get isFree => timeToCompletion == 0;


  @override
  String toString() {
    if (isFree) return '$name is free';
    return '$name is working on ${currentTask.name} with ${timeToCompletion}s left';
  }
}
