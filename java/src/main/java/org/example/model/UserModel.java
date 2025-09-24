package org.example.model;
import jakarta.persistence.*;

@Entity
@Table(name ="app_user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private  String first_name;
    private String last_name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private RoleModel role;

    public UserModel(){};
    public UserModel(Long id, String email, String first_name, String last_name){
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    public String getFirstName(){
        return first_name;
    }

    public String getLastName(){
        return last_name;
    }

    public String getEmail(){
        return email;
    }

    public void setFirstName(String first_name){
        this.first_name = first_name;
    }

    public void setLasttName(String last_name){
        this.last_name = last_name;
    }

    public void setEmail(String email){
        this.email = email;
    }
};