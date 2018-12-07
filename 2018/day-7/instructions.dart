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
    final steps = List.from(firstSteps);
    final workers = List.generate(workerCount, (index) => Worker(index));

    while (steps.isNotEmpty) {
      // Print status.
      print('\ntime = $time');
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
      Step lastSeenStep;
      while (steps.isNotEmpty) {
        // Pop a step.
        final step = steps[0];

        if (lastSeenStep == step) break;

        // If step is still blocked, push back to stack.
        var isBlocked = false;
        for (final worker in workers) {
          if (worker.currentTask != null &&
              step.blockedByStepNames.contains(worker.currentTask.name) &&
              !worker.isFree) {
            isBlocked = true;
            break;
          }
        }
        lastSeenStep = step;
        if (isBlocked) continue;
        steps.removeAt(0);

        // Give a free worker a task.
        final worker = freeWorkers.removeAt(0);
        worker.giveTask(step);
        blockingStepNames.addAll(step.blockingStepNames);
        if (freeWorkers.isEmpty) break;
      }

      // Push blocking steps in alphabetical order.
      steps.addAll(blockingStepNames.map((name) => stepsMap[name]));
      steps.sort();
    }

    return time;
  }
}
