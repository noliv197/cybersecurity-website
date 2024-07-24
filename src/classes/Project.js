export default class Project{
    projectCode;
    projectName;
    projectScheme;
    pps;
    fgaTime;

    constructor(projectCode,projectName,projectScheme,pps,fgaTime){
        this.projectCode = projectCode;
        this.projectName = projectName;
        this.projectScheme = projectScheme;
        this.pps = pps;
        this.fgaTime = fgaTime;
    }
}
