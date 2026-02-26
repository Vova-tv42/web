const facultyObject = {
  facultyName: "ІАТЕ",
  phoneNumber: "+380111111111",
};

const groupObject = {
  specialtyName: "Інженерія ПЗ",
  groupCode: "121",
  studentCount: 25,

  updateSpecialtyName(newName) {
    this.specialtyName = newName;
  },

  updateGroupCode(newCode) {
    this.groupCode = newCode;
  },

  updateStudentCount(newCount) {
    this.studentCount = newCount;
  },

  clearData() {
    this.specialtyName = "";
    this.groupCode = "";
    this.studentCount = 0;
  },
};

function copyFacultyAndGroup(faculty, group) {
  const facultyClone = { ...faculty };
  const groupClone = Object.assign({}, group);
  return { facultyClone, groupClone };
}

Object.setPrototypeOf(groupObject, {
  displayInformation() {
    return `Спеціальність: ${this.specialtyName}, Шифр: ${this.groupCode}, Студентів: ${this.studentCount}`;
  },
});

const sessionObject = Object.create(groupObject);
sessionObject.dismissedCount = 3;
sessionObject.calculateSuccessPercentage = function () {
  if (this.studentCount === 0) return 0;

  return (
    ((this.studentCount - this.dismissedCount) / this.studentCount) *
    100
  ).toFixed(2);
};

sessionObject.displayInformation = function () {
  const parentInfo = Object.getPrototypeOf(this).displayInformation.call(this);
  return `${parentInfo}, Відраховано: ${this.dismissedCount}, Успішність: ${this.calculateSuccessPercentage()}%`;
};

class Group {
  constructor(specialty, code, count) {
    this._specialtyName = specialty;
    this._groupCode = code;
    this._studentCount = count;
  }

  get specialtyName() {
    return this._specialtyName;
  }

  set specialtyName(value) {
    if (value.length > 0) {
      this._specialtyName = value;
    }
  }

  get groupCode() {
    return this._groupCode;
  }

  set groupCode(value) {
    this._groupCode = value;
  }

  get studentCount() {
    return this._studentCount;
  }

  set studentCount(value) {
    if (value >= 0) {
      this._studentCount = value;
    }
  }

  displayInformation() {
    return `Класовий запис - Спеціальність: ${this.specialtyName}, Шифр: ${this.groupCode}, Кількість: ${this.studentCount}`;
  }
}

class Session extends Group {
  constructor(specialty, code, count, dismissed) {
    super(specialty, code, count);
    this.dismissedCount = dismissed;
  }

  get dismissedCount() {
    return this._dismissedCount;
  }

  set dismissedCount(value) {
    if (value >= 0) {
      this._dismissedCount = value;
    }
  }

  calculateSuccessPercentage() {
    if (this.studentCount === 0) return 0;

    return (
      ((this.studentCount - this.dismissedCount) / this.studentCount) *
      100
    ).toFixed(2);
  }

  displayInformation() {
    return `${super.displayInformation()}, Відраховано: ${this.dismissedCount}, Результат: ${this.calculateSuccessPercentage()}%`;
  }
}

const objectsOutput = document.getElementById("objectsOutput");
const inheritanceOutput = document.getElementById("inheritanceOutput");
const classesOutput = document.getElementById("classesOutput");

document.getElementById("runObjectsDemo").addEventListener("click", () => {
  const { facultyClone, groupClone } = copyFacultyAndGroup(
    facultyObject,
    groupObject,
  );

  let result = "-- Початкові об'єкти --\n";
  result += `Факультет: ${facultyObject.facultyName}, Тел: ${facultyObject.phoneNumber}\n`;
  result += `Група: ${groupObject.specialtyName}, Код: ${groupObject.groupCode}\n\n`;

  result += "-- Копії --\n";
  result += `Копія Факультету: ${facultyClone.facultyName}\n`;
  result += `Копія Групи: ${groupClone.specialtyName}\n\n`;

  groupClone.updateSpecialtyName("Кібербезпека");
  result += "-- Після зміни копії --\n";
  result += `Оригінал: ${groupObject.specialtyName}\n`;
  result += `Змінена копія: ${groupClone.specialtyName}`;

  objectsOutput.textContent = result;
});

document.getElementById("runInheritanceDemo").addEventListener("click", () => {
  let result = "-- Прототип Групи --\n";
  result += groupObject.displayInformation() + "\n\n";

  result += "-- Об'єкт Сесія (наслідує Групу) --\n";
  result += sessionObject.displayInformation();

  inheritanceOutput.textContent = result;
});

document.getElementById("runClassesDemo").addEventListener("click", () => {
  const groupInstance = new Group("Інженерія ПЗ", "121", 30);
  const sessionInstance = new Session("Комп'ютерні науки", "122", 20, 2);

  let result = "Екземпляр класу Group\n";
  result += groupInstance.displayInformation() + "\n\n";

  result += "Екземпляр класу Session\n";
  result += sessionInstance.displayInformation() + "\n\n";
  result += "Перевірка сеттерів\n";

  sessionInstance.studentCount = 25;
  sessionInstance.dismissedCount = 5;
  result += `Оновлена кількість: ${sessionInstance.studentCount}\n`;
  result += `Оновлена успішність: ${sessionInstance.calculateSuccessPercentage()}%`;

  classesOutput.textContent = result;
});
