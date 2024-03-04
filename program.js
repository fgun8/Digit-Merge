# Numerical Fusion Game Code

import random

def initialize_board():
    board = [[0] * 4 for _ in range(4)]
    add_random_tile(board)
    add_random_tile(board)
    return board

def add_random_tile(board):
    empty_tiles = [(i, j) for i in range(4) for j in range(4) if board[i][j] == 0]
    if empty_tiles:
        i, j = random.choice(empty_tiles)
        board[i][j] = 2 if random.random() < 0.9 else 4

def slide(board, direction):
    rotated_board = rotate_board(board, direction)
    for row in rotated_board:
        slide_row(row)
    return rotate_board(rotated_board, -direction)

def rotate_board(board, direction):
    if direction == 0:
        return board
    elif direction == 1:
        return [list(row) for row in zip(*board[::-1])]
    elif direction == 2:
        return [row[::-1] for row in board[::-1]]
    elif direction == 3:
        return [list(row) for row in zip(*board)][::-1]

def slide_row(row):
    for i in range(len(row) - 1):
        for j in range(len(row) - 1, i, -1):
            if row[j] == 0:
                row[j] = row[j - 1]
                row[j - 1] = 0
    for i in range(len(row) - 1):
        if row[i] == row[i + 1] and row[i] != 0:
            row[i] *= 2
            row[i + 1] = 0
            break
    for i in range(len(row) - 1):
        for j in range(len(row) - 1, i, -1):
            if row[j] == 0:
                row[j] = row[j - 1]
                row[j - 1] = 0

def print_board(board):
    for row in board:
        print(" ".join(str(tile) if tile != 0 else "." for tile in row))
    print()

def main():
    board = initialize_board()
    print_board(board)
    while True:
        direction = input("Enter direction (W/A/S/D): ").upper()
        if direction == 'W':
            board = slide(board, 0)
        elif direction == 'A':
            board = slide(board, 1)
        elif direction == 'S':
            board = slide(board, 2)
        elif direction == 'D':
            board = slide(board, 3)
        else:
            print("Invalid direction! Use W/A/S/D.")
            continue
        add_random_tile(board)
        print_board(board)

if __name__ == "__main__":
    main()
