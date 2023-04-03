# FORM VALIDATION

## ABOUT THIS PROJECT
This was a simple project I made during my initial javascript studies.
It simulates sending a simple form with a CPF validation.

### WHAT IS CPF?
The Cadastro de Pessoas Físicas (CPF) is a database managed by the Brazilian Federal Revenue Service, which stores registration information on taxpayers required to register with the CPF, or on citizens who have voluntarily registered.
- Algorithm for CPF validation:
  
  ```
  7x  0x 5x 4x 8x 4x 4x 5x 0x multiplication
  10  9  8  7  6  5  4  3  2
  70  0  40 28 48 20 16 15 0 = 237 sum

  11 - (237 % 11) = 5 (First digit)
  If the digit number is greater than 9, we consider 0.

  7x  0x 5x 4x 8x 4x 4x 5x 0x 5x multiplication
  11 10  9  8  7  6  5  4  3  2
  77  0  45 32 56 24 20 20 0  10 = 284 sum

  11 - (284 % 11) = 2 (Second digit)
  If the digit number is greater than 9, we consider 0
  ```
  
## ACCESS
  - https://tivgo.github.io/form-validation/
