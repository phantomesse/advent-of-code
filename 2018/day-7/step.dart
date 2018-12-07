class Step implements Comparable<Step> {
  String _name;
  final blockingStepNames = <String>[];
  final blockedByStepNames = <String>[];

  Step(this._name);

  Step.fromInput(String input) {
    _name = input.substring('Step '.length, input.indexOf(' must'));
    blockingStepNames.add(input
        .substring(input.indexOf('before step') + 'before step'.length,
            input.indexOf('can begin.'))
        .trim());
  }

  String get name => _name;
  
  int get seconds => 1 + name.codeUnitAt(0) - 'A'.codeUnitAt(0);

  @override
  String toString() =>
      '{$_name is blocking $blockingStepNames and blocked by $blockedByStepNames}';

  @override
  int compareTo(Step other) => name.compareTo(other.name);
}
