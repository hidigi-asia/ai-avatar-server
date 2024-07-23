import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Size {
  width: number;
  height: number;
}

@Entity({
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fps: number;

  @Column({
    type: 'json',
  })
  size: Size;

  @Column({
    type: 'json',
  })
  slides: object[];

  @Column()
  userId: number;
}
