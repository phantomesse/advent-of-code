import 'dart:io';
import 'dart:math';

class CorruptionChecksum {
  static Spreadsheet getSpreadsheet(String input) {
    return new Spreadsheet(input
        .split('\n')
        .map((inputRow) =>
            new Row(inputRow.split(new RegExp(r'\s')).map(int.parse).toList()))
        .toList());
  }
}

class Spreadsheet {
  final List<Row> _rows;

  Spreadsheet(this._rows);

  int get checksum => _rows.fold(0, (checksum, row) => checksum + row.checksum);

  int get evenlyDivisibleChecksum =>
      _rows.fold(0, (checksum, row) => checksum + row.evenlyDivisibleChecksum);

  @override
  bool operator ==(other) {
    if (other == null || !(other is Spreadsheet)) return false;
    return _compareLists(_rows, other._rows);
  }
}

class Row {
  final List<int> _values;

  Row(this._values);

  int get checksum => _values.reduce(max) - _values.reduce(min);

  int get evenlyDivisibleChecksum {
    for (var i = 0; i < _values.length; i++) {
      var value1 = _values[i];
      for (var j = i + 1; j < _values.length; j++) {
        var value2 = _values[j];
        if (value1 % value2 == 0 || value2 % value1 == 0) {
          return max(value1, value2) ~/ min(value1, value2);
        }
      }
    }
  }

  @override
  bool operator ==(other) {
    if (other == null || !(other is Row)) return false;
    return _compareLists(_values, other._values);
  }
}

bool _compareLists<T>(List<T> list1, List<T> list2) {
  if (list1 == null && list2 == null) return true;
  if (list1 == null || list2 == null || list1.length != list2.length) {
    return false;
  }
  for (var i = 0; i < list1.length; i++) {
    if (list2[i] != list1[i]) return false;
  }
  return true;
}

void main() {
  var input = new File('part1.txt').readAsStringSync();
  print(CorruptionChecksum.getSpreadsheet(input).checksum);

  input = new File('part2.txt').readAsStringSync();
  print(CorruptionChecksum.getSpreadsheet(input).evenlyDivisibleChecksum);
}
