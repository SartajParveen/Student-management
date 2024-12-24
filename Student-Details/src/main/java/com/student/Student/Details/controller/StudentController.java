package com.student.Student.Details.controller;

import com.student.Student.Details.entity.Student;
import com.student.Student.Details.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/details")
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @GetMapping("/students")
    public List<Student> getStudents(){
        return studentRepo.findAll();
    }

    @PutMapping("/updateStudent/{id}")
    public Student saveStudent(@RequestBody Student student,@PathVariable("id") Integer id){
        student.setId(id);
        return studentRepo.save(student);
    }
    @PostMapping("/addStudents")
    public Student addStudent(@RequestBody Student student){
        return studentRepo.save(student);
    }

    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudent(@PathVariable("id") Integer id){
        studentRepo.deleteById(id);
        return "Student deleted";
    }
}
