import 'dart:io';
import 'step.dart';
import 'worker.dart';

class Instructions {
  final stepsMap = <String, Step>{};

  Instructions(inputFileName) {
    final inputs = new File(inputFileName).readAsStringSync().split('\n');

    for (final input in inputs) {
      final step = Step.fromInput(input);
      if (stepsMap.containsKey(step.name)) {
        final blockingStepName = step.blockingStepNames.single;
        stepsMap[step.name].blockingStepNames.add(blockingStepName);

        // Add blocking step to map.
        if (stepsMap.containsKey(blockingStepName)) {
          stepsMap[blockingStepName].blockedByStepNames.add(step.name);
        } else {
          stepsMap[blockingStepName] = Step(blockingStepName)
            ..blockedByStepNames.add(step.name);
        }
      } else {
        stepsMap[step.name] = step;

        // Add blocking step to map.
        final blockingStepName = step.blockingStepNames.single;
        if (stepsMap.containsKey(blockingStepName)) {
          stepsMap[blockingStepName].blockedByStepNames.add(step.name);
        } else {
          stepsMap[blockingStepName] = Step(blockingStepName)
            ..blockedByStepNames.add(step.name);
        }
      }
    }
  }

  /// Find step that isn't blocking any other step.
  Step get lastStep =>
      stepsMap.values.singleWhere((step) => step.blockingStepNames.isEmpty);

  /// Find steps that aren't blocked by any other step.
  List<Step> get firstSteps {
    return stepsMap.values
        .where((step) => step.blockedByStepNames.isEmpty)
        .toList()
          ..sort();
  }

  String get order {
    var order = '';
    var steps = List.from(firstSteps);

    while (steps.isNotEmpty) {
      // Pop step.
      final step = steps.removeAt(0);

      // If step is still blocked, push back to stack.
      var isBlocked = false;
      for (final blockedByStepName in step.blockedByStepNames) {
        if (!order.contains(blockedByStepName)) {
          isBlocked = true;
          break;
        }
      }
      if (isBlocked) {
        steps.add(step);
        continue;
      }

      // Add step to order.
      order += step.name;

      // Push blocking steps in alphabetical order.
      final blockingStepNames = step.blockingStepNames..sort();
      steps.removeWhere((step) => blockingStepNames.contains(step.name));
      steps.addAll(blockingStepNames.map((name) => stepsMap[name]));
      steps.sort();
    }

    return order;
  }

  int getSeconds(int workerCount) {
    int time = -1;
    final steps = stepsMap.values.toList()..sort(); //List.from(firstSteps);
    final workers = List.generate(workerCount, (index) => Worker(index));
    final workingWorkers = <Worker>[];

    var done = '';
    while (steps.isNotEmpty || workingWorkers.isNotEmpty) {
      final workersToRemove = <Worker>[];
      for (final worker in workingWorkers) {
        if (worker.timeToCompletion == 1) {
          done += worker.currentTask.name;
          workersToRemove.add(worker);
        }
      }
      workingWorkers.removeWhere((worker) => workersToRemove.contains(worker));
      if (steps.isEmpty && workingWorkers.isEmpty) break;

      // Print status.
      print('\ntime = $time \t $done');
      for (final worker in workers) {
        print(worker);
      }

      // Advance in time.
      time++;
      for (final worker in workers) {
        worker.advanceInTime();
      }

      // Find free workers.
      final freeWorkers = workers.where((worker) => worker.isFree).toList();
      if (freeWorkers.isEmpty) continue;

      // Give each free worker a task.
      final blockingStepNames = <String>[];
      Set<Step> blockedSteps = new Set();
      while (steps.isNotEmpty) {
        if (blockedSteps.contains(steps[0])) break;

        // Pop a step.
        final step = steps.removeAt(0);

        // If step is still blocked, push back to stack.
        var isBlocked = false;
        for (final stepName in step.blockedByStepNames) {
          if (!done.contains(stepName)) {
            isBlocked = true;
            break;
          }
        }
        print('Step ${step.name} is blocked = $isBlocked');
        if (isBlocked) {
          steps.add(step);
          blockedSteps.add(step);
          continue;
        }

        // Give a free worker a task.
        final worker = freeWorkers.removeAt(0);
        worker.giveTask(step);
        blockingStepNames.addAll(step.blockingStepNames);
        workingWorkers.add(worker);
        if (freeWorkers.isEmpty) break;
      }

      // Push blocking steps in alphabetical order.
      for (final name in blockingStepNames) {
        final step = stepsMap[name];
        if (steps.contains(step)) continue;
        steps.add(step);
      }
      steps.sort();
    }

    return time + 1;
  }
}
