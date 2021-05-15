:: Wrapper: Offline (Revision) Info
:: This file is used across Wrapper: Offline (Revision). It is not organized, but comments for each setting have been added.
:: You should not be touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.
@echo off && cls

:: List everything
echo Wrapper version: !WRAPPER_VER!
echo Wrapper release type: !WRAPPER_TYPE!
echo Project lead: !PROJECT_LEAD!

:: Wrapper: Offline (Revision) version
set WRAPPER_VER=1.3.0

:: Wrapper: Offline (Revision) release type
set WRAPPER_TYPE=Beta

:: Wrapper: Offline (Revision) project lead
set PROJECT_LEAD=octanuary
