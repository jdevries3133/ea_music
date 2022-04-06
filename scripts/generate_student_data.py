"""
Script to generate student data as described in `.env.template`. Notice that
in ./infra.tf`, the output of `student_data.json` is read in and injected into
the pod's environment. This consumes the output of this file, so this script
should be run first.

This script uses my own teacherhelper library:
- https://pypi.org/project/teacherhelper/
- https://github.com/jdevries3133/teacher_helper/
"""

import json

from teacherhelper.sis import Sis


TEACHER_NAME_TO_HOMEROOM_CODE = {
    "Espiritu, Melissa": '7A',
    "Shuzman, Adam": '6E',
    "Davis, Shondell": '7B',
    "Wilder, Jack": '7E',
    "Baurkot, Juliana": '7E',
    "Zhu, Zhu": '7C',
    "Chambers, TyNiesha": '7D',
    "Regan, Katelyn": '7D',
    "Zou, Jiying": '6C',
    "Chung, Soyoun": '6D',
    "Silvestri, Melissa": '5D',
    "Irizarry, Gina": '6A',
    "Saadeh, Salwa": '6B',
    "Armstead, Joseph": '5C',
    "Geltzeiler, Katelyn": '5B',
    "Kassalow, Anne": '5A',
    "DuVal, Dina": '4B',
    "Ruffee, Michele": '5E',
    "Carrie, Jannine": '4E',
    "DAmario, Danielle": '4E',
    "Morrow, Lisa": '4C',
    "Chartier, Jessica": '4E',
    "Rodriguez, Joseph": '4D',
    "McNeill, Kaity": '4A',
}


if __name__ == '__main__':
    sis = Sis.read_cache()
    data = [
        {'name': s.name,
         'homeroom': TEACHER_NAME_TO_HOMEROOM_CODE[s.homeroom]}
        for s in sis.students.values()  # type: ignore
    ]

    with open('student_data.json', 'w') as fp:
        json.dump(data, fp)
