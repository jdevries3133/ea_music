"""pyautogui script to download all the posters on this spreadsheet, and move
them into the desired file format based on the spreadsheet data."""

import csv
import os
import glob
from pathlib import Path
from time import sleep
import sys

import pyautogui as pg
import pyperclip as pc
from teacherhelper import Helper

from generate_student_data import TEACHER_NAME_TO_HOMEROOM_CODE


DOWNLOAD_FOLDER = os.getenv("HOME", '/') + '/Downloads'

helper = Helper.read_cache()

if glob.glob(DOWNLOAD_FOLDER + '/*'):
    print('clear your downloads folder before running')
    sys.exit(1)


def parse_form_data():
    """On startup, the google form data is parsed into a mapping of poster
    links to sanitized student names. Student names are sanitized via the
    teacherhelper library."""
    with open('form_data.csv', 'r') as fp:
        rd = csv.reader(fp)
        next(rd)  # discard headers
        mapping = {}
        for row in rd:
            link = row[1]
            group_members = []
            for cell in row[2:]:
                if cell:
                    group_members.append(cell)
            sanitized_members = []
            for m in group_members:
                st = helper.find_nearest_match(m, threshold=75)  # type: ignore
                if not st:
                    print(f'LOST: {m}')
                else:
                    sanitized_members.append(st.name)
            mapping[link] = sanitized_members

        return mapping


LINK_TO_STUDENT_NAMES = parse_form_data()


def hotkey(*args):
    for a in args:
        pg.keyDown(a)
    for a in args:
        pg.keyUp(a)


def capture_download(link: str):
    """There is exactly one png file in the downloads folder which we are
    going to use now.

    @param link is used to match a group of students with the link from the
    spreadsheet.
    """
    targets = glob.glob(DOWNLOAD_FOLDER + '/*')

    assert len(targets) == 1
    assert targets[0]

    target = targets[0]

    students = LINK_TO_STUDENT_NAMES[link]
    homeroom = TEACHER_NAME_TO_HOMEROOM_CODE[helper.find_nearest_match(students[0]).homeroom]  # type: ignore

    if Path(target).exists():
        os.rename(target, f'{os.getcwd()}/posters/{homeroom}/{",".join(students)}.png')


def main():

    # go to the poster and download it
    hotkey('command', 'c')
    hotkey('command', 't')
    hotkey('command', 'v')
    pg.press('enter')
    sleep(5)

    pg.keyDown('option')
    pg.keyDown('/')
    pg.keyUp('option')
    pg.keyUp('/')

    pg.typewrite('download as image (.jpg)')
    pg.press('enter')

    while not glob.glob(DOWNLOAD_FOLDER + '/*'):
        sleep(1)

    # move the thing to where it belongs
    capture_download(pc.paste())


    # cleanup browser navigation
    hotkey('command', 'w')
    pg.press('down')



if __name__ == '__main__':
    hotkey('command', 'tab')
    while True: main()

