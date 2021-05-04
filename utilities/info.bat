:: Wrapper: Offline (Revision) Info
:: This file is used across Wrapper: Offline (Revision). It is not organized, but comments for each setting have been added.
:: You should not be touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.

:: Opens this file in Notepad when run
setlocal
if "%SUBSCRIPT%"=="" ( start notepad.exe config.bat & exit )
endlocal

:: Wrapper: Offline (Revision) version
set WRAPPER_VER=1.3.0

:: Wrapper: Offline (Revision) release type
set WRAPPER_TYPE=public

:: Dark mode in Wrapper. Default: y
set DARKMODE=y
