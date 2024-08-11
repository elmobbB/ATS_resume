// const fs = require('fs');
// const path = require('path');
// const pdfParser = require('pdf-parse');
// const mammoth = require('mammoth');

// // Source directory path
// const sourceDirectoryPath = 'C:\\Users\\Claire\\ATS_resume\\unfilteredResume';

// // Destination directory path
// const destinationDirectoryPath = 'C:\\Users\\Claire\\ATS_resume\\filteredResume';

// // Create the destination directory if it doesn't exist
// if (!fs.existsSync(destinationDirectoryPath)) {
//     fs.mkdirSync(destinationDirectoryPath,{ recursive: true });
// }

// // Function to filter and copy resumes
// function filterAndCopyResumes() {
//     fs.readdir(sourceDirectoryPath,(err,files) => {
//         if (err) {
//             console.error('Error reading source directory:',err);
//             return;
//         }

//         files.forEach((file) => {
//             const filePath = path.join(sourceDirectoryPath,file);
//             const fileExtension = path.extname(file).toLowerCase();

//             if (fileExtension === '.pdf') {
//                 // Parse the PDF file
//                 pdfParser(fs.readFileSync(filePath))
//                     .then((data) => {
//                         // Check if the resume contains the "computer science" keyword
//                         if (data.text.toLowerCase().includes('computer science')) {
//                             copyFile(filePath,file);
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error parsing PDF:',error);
//                     });
//             } else if (fileExtension === '.docx') {
//                 // Parse the DOCX file
//                 mammoth.extractRawText({ path: filePath })
//                     .then((result) => {
//                         // Check if the resume contains the "computer science" keyword
//                         if (result.value.toLowerCase().includes('computer science')) {
//                             copyFile(filePath,file);
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error parsing DOCX:',error);
//                     });
//             }
//         });

//         console.log('Filtering complete. Filtered resumes saved to:',destinationDirectoryPath);
//     });
// }

// // Function to copy a file
// function copyFile(sourceFilePath,fileName) {
//     const destinationFilePath = path.join(destinationDirectoryPath,fileName);

//     fs.copyFile(sourceFilePath,destinationFilePath,(err) => {
//         if (err) {
//             console.error('Error copying file:',err);
//         } else {
//             console.log('Copied file:',fileName);
//         }
//     });
// }

// // Call the filterAndCopyResumes function
// filterAndCopyResumes();

const fs = require('fs');
const path = require('path');
const pdfParser = require('pdf-parse');
const mammoth = require('mammoth');

// Source directory path
const sourceDirectoryPath = 'C:\\Users\\Claire\\ATS_resume\\unfilteredResume';

// Destination directory path
const destinationDirectoryPath = 'C:\\Users\\Claire\\ATS_resume\\filteredResume';

// Dumped directory path
const dumpedDirectoryPath = 'C:\\Users\\Claire\\ATS_resume\\dumped';

// Create the destination and dumped directories if they don't exist
if (!fs.existsSync(destinationDirectoryPath)) {
    fs.mkdirSync(destinationDirectoryPath,{ recursive: true });
}
if (!fs.existsSync(dumpedDirectoryPath)) {
    fs.mkdirSync(dumpedDirectoryPath,{ recursive: true });
}

// Function to filter and copy resumes
function filterAndCopyResumes() {
    fs.readdir(sourceDirectoryPath,(err,files) => {
        if (err) {
            console.error('Error reading source directory:',err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(sourceDirectoryPath,file);
            const fileExtension = path.extname(file).toLowerCase();

            if (fileExtension === '.pdf') {
                // Parse the PDF file
                pdfParser(fs.readFileSync(filePath))
                    .then((data) => {
                        // Check if the resume contains the "computer science" keyword
                        if (data.text.toLowerCase().includes('computer science')) {
                            copyFile(filePath,file);
                        }
                    })
                    .catch((error) => {
                        console.error('Error parsing PDF:',error);
                        dumpFile(filePath,file);
                    });
            } else if (fileExtension === '.docx') {
                // Parse the DOCX file
                mammoth.extractRawText({ path: filePath })
                    .then((result) => {
                        // Check if the resume contains the "computer science" keyword
                        if (result.value.toLowerCase().includes('computer science')) {
                            copyFile(filePath,file);
                        }
                    })
                    .catch((error) => {
                        console.error('Error parsing DOCX:',error);
                        dumpFile(filePath,file);
                    });
            }
        });

        console.log('Filtering complete. Filtered resumes saved to:',destinationDirectoryPath);
    });
}

// Function to copy a file
function copyFile(sourceFilePath,fileName) {
    const destinationFilePath = path.join(destinationDirectoryPath,fileName);

    fs.copyFile(sourceFilePath,destinationFilePath,(err) => {
        if (err) {
            console.error('Error copying file:',err);
        } else {
            console.log('Copied file:',fileName);
        }
    });
}

// Function to move a file to the dumped directory
function dumpFile(sourceFilePath,fileName) {
    const dumpedFilePath = path.join(dumpedDirectoryPath,fileName);

    fs.copyFile(sourceFilePath,dumpedFilePath,(err) => {
        if (err) {
            console.error('Error moving file to dumped directory:',err);
        } else {
            console.log('Moved file to dumped directory:',fileName);
        }
    });
}

// Call the filterAndCopyResumes function
filterAndCopyResumes();