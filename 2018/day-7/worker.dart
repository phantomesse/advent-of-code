import 'dart:math';

import 'step.dart';

class Worker {
  final String name;
  Step _currentTask;
  int _timeToCompletion = 0;

  Worker(int index) : name = 'Worker $index';

  void giveTask(Step step) {
    _currentTask = step;
    _timeToCompletion = step.seconds;
  }

  void advanceInTime() => _timeToCompletion = max(_timeToCompletion - 1, 0);

  bool get isFree => _timeToCompletion == 0;

  Step get currentTask => _currentTask;

  @override
  String toString() {
    if (isFree) return '$name is free';
    return '$name is working on ${_currentTask.name} with ${_timeToCompletion}s left';
  }
}
