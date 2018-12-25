@echo off
setlocal enabledelayedexpansion
:: 用 nbtstat 方式获取局域网内所有电脑的MAC地址及电脑名。
::如果不用 ping 可以检测到防止 ping 的主机，但这样时间消耗很大；
::先 ping 到主机后，再执行 nbtstat 可以节约一点时间。

echo %date% %time% > MACS.txt
set ip=192.169.0
set rdo=0

for /l %%s in (4,1,254) do (
	echo %%s
	ping %ip%.%%s -n 1 -w 100 | find "TTL" > nul && (
		set rdo=0
		for /F "tokens=1,2,3,4*" %%i in ('nbtstat -a %ip%.%%s ^| findstr "<00> MAC" ^| findstr /v "组"') do (
			::echo %%i,%%j,%%k,%%l
			if not !rdo!==1 (
				if {%%k}=={=} (
					echo %ip%.%%s	%%l		!rdo! >> MACS.txt
					set rdo=1
				) else (
					set rdo=%%i
				)
			)
		)
	)
)
exit
