import 'package:test/test.dart';

import 'instructions.dart';

void main() {
  group('', () {
    Instructions instructions;

    setUp(() {
      instructions = Instructions('test-input.txt');
    });

    test('last step is E', () {
      expect(instructions.lastStep.name, 'E');
    });

    test('first step is C', () {
      expect(instructions.firstSteps.single.name, 'C');
    });

    test('order is CABDFE', () {
      expect(instructions.order, 'CABDFE');
    });

    test('Blocked by', () {
      expect(instructions.stepsMap['A'].blockedByStepNames, ['C']);
      expect(instructions.stepsMap['B'].blockedByStepNames, ['A']);
      expect(instructions.stepsMap['C'].blockedByStepNames, isEmpty);
      expect(instructions.stepsMap['D'].blockedByStepNames, ['A']);
      expect(instructions.stepsMap['E'].blockedByStepNames, ['B', 'D', 'F']);
      expect(instructions.stepsMap['F'].blockedByStepNames, ['C']);
    });

    test('Seconds for each step', () {
      expect(instructions.stepsMap['A'].seconds, 1);
      expect(instructions.stepsMap['B'].seconds, 2);
      expect(instructions.stepsMap['C'].seconds, 3);
      expect(instructions.stepsMap['D'].seconds, 4);
      expect(instructions.stepsMap['E'].seconds, 5);
      expect(instructions.stepsMap['F'].seconds, 6);
    });

    test('15 seconds for 2 workers', () {
      expect(instructions.getSeconds(2), 15);
    });
  });
}
