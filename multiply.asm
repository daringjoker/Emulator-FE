     MVI B, 2H ; it is the multiplicand
     MVI C, 2H ; it is the multiplicand
     MVI A, 0h ; it is the product
top: ADD B
     DCR C
     JNZ top
     HLT
     