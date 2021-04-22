:: Wrapper: Offline Info
:: This file is used across Wrapper: Offline. It is not organized, but comments for each setting have been added.
:: You should not be touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.

:: Opens this file in Notepad when run
setlocal
if "%SUBSCRIPT%"=="" ( start notepad.exe config.bat & exit )
endlocal

:: Dark mode in Wrapper. Default: y
set DARKMODE=y
