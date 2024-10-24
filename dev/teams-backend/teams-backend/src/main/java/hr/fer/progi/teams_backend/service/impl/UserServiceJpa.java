package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.UserRepository;
import hr.fer.progi.teams_backend.domain.User;
import hr.fer.progi.teams_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }
}
