# /bin/bash
SCRIPT_DIR=$(cd $(dirname "$0"); pwd)

echo "Outputting in JSON format by executing license-checker-residelsohn."
OUTPUTFILE=${1:-"licenses.json"}
echo "OutputFile is $OUTPUTFILE by default. If you want tou change filename, you should specify the first arg."
CUSTOMPATH=${2:-"customFormat.json"}
echo "CustomFile is $CUSTOMPATH by default. If you want to change filename, you should specify the second arg."
pnpm license-checker-rseidelsohn --json --out $SCRIPT_DIR/$OUTPUTFILE --customPath $SCRIPT_DIR/customFormat.json

if [ $? -eq 0 ] ; then
echo "Complete! 🤞"
else
echo "Failed...🤮, this process is terminating.👋"
exit 1
fi

echo "Picking only necessary keys."
pnpm dlx tsx $SCRIPT_DIR/cleanLicenses.ts $OUTPUTFILE

echo "All process finished. If you want to move the final output file into your project directory, you modify this script."
echo "mv command is written below."
#mv $SCRIPT_DIR/$OUTPUTFILE $SCRIPT_DIR/../constants/