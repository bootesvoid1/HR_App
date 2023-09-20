export class Certificate {
  constructor(
    public id: string,
    public candidateName: string,
    public courseName: string,
    public creditHours: number,
    public endDate: Date,
    public notes: string
  ) {}
}
