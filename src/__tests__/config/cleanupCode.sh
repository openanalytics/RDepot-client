#!/bin/sh

if grep -Eqr 'describe.only|test.only' src/__tests__/end-to-end/; then
    echo error! \"only\" directive should be removed from the test code
    exit 1
else
    echo success! \"only\" directive not found!
fi